import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { AppModule } from '../../src/app.module';
import { Sequelize } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { Cliente } from '../../src/infrastructure/database/entities/cliente.entity';
import { Funcionario } from '../../src/infrastructure/database/entities/funcionario.entity';
import { Usuario } from '../../src/infrastructure/database/entities/usuario.entity';

describe('AuthController (Integration)', () => {
  let app: INestApplication;
  let sequelize: Sequelize;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    sequelize = moduleFixture.get<Sequelize>(Sequelize);
    await app.init();
  });

  beforeEach(async () => {
    // Limpar o banco de dados antes de cada teste
    await sequelize.truncate({ cascade: true });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /auth/token', () => {
    it('should generate a token', async () => {
      const response = await supertest(app.getHttpServer()).get('/auth/token');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  });

  describe('POST /auth/login/funcionario', () => {
    it('should login a funcionario successfully', async () => {
      // Criar um funcionário de teste
      const hashedPassword = await bcrypt.hash('senha123', 10);
      const usuario = await Usuario.create({
        nome_completo: 'Funcionário Teste',
        email: 'funcionario@email.com',
        telefone: '11999999999',
        senha: hashedPassword,
      });

      await Funcionario.create({
        nome_completo: 'Funcionário Teste',
        email: 'funcionario@email.com',
        telefone: '11999999999',
        id_usuario: usuario.id_usuario,
      });

      const loginDto = {
        email: 'funcionario@email.com',
        senha: 'senha123',
      };

      const response = await supertest(app.getHttpServer())
        .post('/auth/login/funcionario')
        .send(loginDto);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('access_token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe(loginDto.email);
    });

    it('should return 401 when credentials are invalid', async () => {
      const loginDto = {
        email: 'funcionario@email.com',
        senha: 'senha_errada',
      };

      const response = await supertest(app.getHttpServer())
        .post('/auth/login/funcionario')
        .send(loginDto);

      expect(response.status).toBe(401);
    });
  });

  describe('POST /auth/login/cliente', () => {
    it('should login a cliente successfully', async () => {
      // Criar um cliente de teste
      const hashedPassword = await bcrypt.hash('senha123', 10);
      const usuario = await Usuario.create({
        nome_completo: 'Cliente Teste',
        email: 'cliente@email.com',
        telefone: '11999999999',
        senha: hashedPassword,
      });

      await Cliente.create({
        nome_completo: 'Cliente Teste',
        email: 'cliente@email.com',
        cnpj: '12345678900000',
        telefone: '11999999999',
        id_usuario: usuario.id_usuario,
      });

      const loginDto = {
        email: 'cliente@email.com',
        senha: 'senha123',
      };

      const response = await supertest(app.getHttpServer())
        .post('/auth/login/cliente')
        .send(loginDto);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('access_token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe(loginDto.email);
    });

    it('should return 401 when credentials are invalid', async () => {
      const loginDto = {
        email: 'cliente@email.com',
        senha: 'senha_errada',
      };

      const response = await supertest(app.getHttpServer())
        .post('/auth/login/cliente')
        .send(loginDto);

      expect(response.status).toBe(401);
    });
  });
}); 