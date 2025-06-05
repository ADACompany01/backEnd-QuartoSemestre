import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { AppModule } from '../../src/app.module';
import { Sequelize } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { Pacote } from '../../src/infrastructure/database/entities/pacote.entity';
import { Cliente } from '../../src/infrastructure/database/entities/cliente.entity';
import { Usuario } from '../../src/infrastructure/database/entities/usuario.entity';

describe('PacoteController (Integration)', () => {
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

  describe('POST /pacote', () => {
    it('should create a new pacote', async () => {
      // Criar um cliente de teste
      const hashedPassword = await bcrypt.hash('senha123', 10);
      const usuario = await Usuario.create({
        nome_completo: 'Cliente Teste',
        email: 'cliente@email.com',
        telefone: '11999999999',
        senha: hashedPassword,
      });

      const cliente = await Cliente.create({
        nome_completo: 'Cliente Teste',
        email: 'cliente@email.com',
        cnpj: '12345678900000',
        telefone: '11999999999',
        id_usuario: usuario.id_usuario,
      });

      const createPacoteDto = {
        id_cliente: cliente.id_cliente,
        tipo_pacote: 'A',
        valor_base: 100.00,
      };

      const response = await supertest(app.getHttpServer())
        .post('/pacote')
        .send(createPacoteDto);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id_pacote');
      expect(response.body.id_cliente).toBe(createPacoteDto.id_cliente);
      expect(response.body.tipo_pacote).toBe(createPacoteDto.tipo_pacote);
      expect(response.body.valor_base).toBe(createPacoteDto.valor_base);
    });
  });

  describe('GET /pacote', () => {
    it('should return a list of pacotes', async () => {
      // Criar um cliente de teste
      const hashedPassword = await bcrypt.hash('senha123', 10);
      const usuario = await Usuario.create({
        nome_completo: 'Cliente Teste',
        email: 'cliente@email.com',
        telefone: '11999999999',
        senha: hashedPassword,
      });

      const cliente = await Cliente.create({
        nome_completo: 'Cliente Teste',
        email: 'cliente@email.com',
        cnpj: '12345678900000',
        telefone: '11999999999',
        id_usuario: usuario.id_usuario,
      });

      // Criar alguns pacotes de teste
      await Pacote.create({
        id_cliente: cliente.id_cliente,
        tipo_pacote: 'A',
        valor_base: 100.00,
      });

      await Pacote.create({
        id_cliente: cliente.id_cliente,
        tipo_pacote: 'AA',
        valor_base: 200.00,
      });

      const response = await supertest(app.getHttpServer()).get('/pacote');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
    });
  });

  describe('GET /pacote/:id', () => {
    it('should return a pacote by id', async () => {
      // Criar um cliente de teste
      const hashedPassword = await bcrypt.hash('senha123', 10);
      const usuario = await Usuario.create({
        nome_completo: 'Cliente Teste',
        email: 'cliente@email.com',
        telefone: '11999999999',
        senha: hashedPassword,
      });

      const cliente = await Cliente.create({
        nome_completo: 'Cliente Teste',
        email: 'cliente@email.com',
        cnpj: '12345678900000',
        telefone: '11999999999',
        id_usuario: usuario.id_usuario,
      });

      // Criar um pacote de teste
      const pacote = await Pacote.create({
        id_cliente: cliente.id_cliente,
        tipo_pacote: 'A',
        valor_base: 100.00,
      });

      const response = await supertest(app.getHttpServer()).get(`/pacote/${pacote.id_pacote}`);

      expect(response.status).toBe(200);
      expect(response.body.id_pacote).toBe(pacote.id_pacote);
      expect(response.body.id_cliente).toBe(pacote.id_cliente);
      expect(response.body.tipo_pacote).toBe(pacote.tipo_pacote);
      expect(response.body.valor_base).toBe(pacote.valor_base);
    });

    it('should return 404 when pacote is not found', async () => {
      const response = await supertest(app.getHttpServer()).get('/pacote/1');

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /pacote/:id', () => {
    it('should update a pacote', async () => {
      // Criar um cliente de teste
      const hashedPassword = await bcrypt.hash('senha123', 10);
      const usuario = await Usuario.create({
        nome_completo: 'Cliente Teste',
        email: 'cliente@email.com',
        telefone: '11999999999',
        senha: hashedPassword,
      });

      const cliente = await Cliente.create({
        nome_completo: 'Cliente Teste',
        email: 'cliente@email.com',
        cnpj: '12345678900000',
        telefone: '11999999999',
        id_usuario: usuario.id_usuario,
      });

      // Criar um pacote de teste
      const pacote = await Pacote.create({
        id_cliente: cliente.id_cliente,
        tipo_pacote: 'A',
        valor_base: 100.00,
      });

      const updatePacoteDto = {
        tipo_pacote: 'AA',
        valor_base: 150.00,
      };

      const response = await supertest(app.getHttpServer())
        .put(`/pacote/${pacote.id_pacote}`)
        .send(updatePacoteDto);

      expect(response.status).toBe(200);
      expect(response.body.tipo_pacote).toBe(updatePacoteDto.tipo_pacote);
      expect(response.body.valor_base).toBe(updatePacoteDto.valor_base);
    });

    it('should return 404 when pacote is not found', async () => {
      const updatePacoteDto = {
        tipo_pacote: 'AA',
        valor_base: 150.00,
      };

      const response = await supertest(app.getHttpServer())
        .put('/pacote/1')
        .send(updatePacoteDto);

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /pacote/:id', () => {
    it('should delete a pacote', async () => {
      // Criar um cliente de teste
      const hashedPassword = await bcrypt.hash('senha123', 10);
      const usuario = await Usuario.create({
        nome_completo: 'Cliente Teste',
        email: 'cliente@email.com',
        telefone: '11999999999',
        senha: hashedPassword,
      });

      const cliente = await Cliente.create({
        nome_completo: 'Cliente Teste',
        email: 'cliente@email.com',
        cnpj: '12345678900000',
        telefone: '11999999999',
        id_usuario: usuario.id_usuario,
      });

      // Criar um pacote de teste
      const pacote = await Pacote.create({
        id_cliente: cliente.id_cliente,
        tipo_pacote: 'A',
        valor_base: 100.00,
      });

      const response = await supertest(app.getHttpServer()).delete(`/pacote/${pacote.id_pacote}`);

      expect(response.status).toBe(200);

      // Verificar se o pacote foi realmente excluído
      const getResponse = await supertest(app.getHttpServer()).get(`/pacote/${pacote.id_pacote}`);
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 when pacote is not found', async () => {
      const response = await supertest(app.getHttpServer()).delete('/pacote/1');

      expect(response.status).toBe(404);
    });
  });
}); 