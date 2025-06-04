import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { AppModule } from '../../src/app.module';
import { Sequelize } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { Cliente } from '../../src/infrastructure/database/entities/cliente.entity';
import { Usuario } from '../../src/infrastructure/database/entities/usuario.entity';
import { FuncionarioGuard } from '../../src/interfaces/http/guards/funcionario.guard';
import { FUNCIONARIO_REPOSITORY } from '../../src/infrastructure/providers/funcionario.provider';
import { HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';

describe('ClienteController (Integration)', () => {
  let app: INestApplication;
  let sequelize: Sequelize;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        JwtModule.register({
          secret: 'test-secret-key',
          signOptions: { expiresIn: '1h' },
        }),
      ],
    })
    .overrideGuard(FuncionarioGuard)
    .useValue({ canActivate: () => true })
    .overrideProvider(FUNCIONARIO_REPOSITORY)
    .useValue({
      findByEmail: jest.fn().mockResolvedValue({ id: uuidv4(), email: 'funcionario@test.com' }),
    })
    .compile();

    app = moduleFixture.createNestApplication();
    sequelize = moduleFixture.get<Sequelize>(Sequelize);
    jwtService = moduleFixture.get<JwtService>(JwtService);
    await app.init();
  });

  beforeEach(async () => {
    await sequelize.truncate({ cascade: true });
  });

  afterAll(async () => {
    await app.close();
  });

  const generateToken = () => {
    return jwtService.sign({
      sub: uuidv4(),
      email: 'funcionario@test.com',
      tipo_usuario: 'funcionario',
      id_usuario: uuidv4(),
    });
  };

  describe('POST /clientes/cadastro', () => {
    it('should create a new cliente', async () => {
      const createClienteDto = {
        nome_completo: 'Cliente Teste',
        email: 'cliente@email.com',
        senha: 'senha123',
        cnpj: '12345678900000',
        telefone: '11999999999',
      };

      const response = await supertest(app.getHttpServer())
        .post('/clientes/cadastro')
        .send(createClienteDto);

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body).toHaveProperty('id_cliente');
      expect(response.body.nome_completo).toBe(createClienteDto.nome_completo);
      expect(response.body.email).toBe(createClienteDto.email);
      expect(response.body.cnpj).toBe(createClienteDto.cnpj);
      expect(response.body.telefone).toBe(createClienteDto.telefone);
    });

    it('should return 400 when email already exists', async () => {
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

      const createClienteDto = {
        nome_completo: 'Novo Cliente',
        email: 'cliente@email.com',
        senha: 'senha123',
        cnpj: '12345678900001',
        telefone: '11999999998',
      };

      const response = await supertest(app.getHttpServer())
        .post('/clientes/cadastro')
        .send(createClienteDto);

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Email já cadastrado');
    });
  });

  describe('GET /clientes', () => {
    it('should return a list of clientes', async () => {
      const hashedPassword = await bcrypt.hash('senha123', 10);
      const usuario1 = await Usuario.create({
        nome_completo: 'Cliente 1',
        email: 'cliente1@email.com',
        telefone: '11999999999',
        senha: hashedPassword,
      });

      const usuario2 = await Usuario.create({
        nome_completo: 'Cliente 2',
        email: 'cliente2@email.com',
        telefone: '11999999998',
        senha: hashedPassword,
      });

      await Cliente.create({
        nome_completo: 'Cliente 1',
        email: 'cliente1@email.com',
        cnpj: '12345678900001',
        telefone: '11999999999',
        id_usuario: usuario1.id_usuario,
      });

      await Cliente.create({
        nome_completo: 'Cliente 2',
        email: 'cliente2@email.com',
        cnpj: '12345678900002',
        telefone: '11999999998',
        id_usuario: usuario2.id_usuario,
      });

      const token = generateToken();

      const response = await supertest(app.getHttpServer())
        .get('/clientes')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toHaveProperty('statusCode', HttpStatus.OK);
      expect(response.body).toHaveProperty('message', 'Clientes encontrados com sucesso');
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(2);
    });
  });

  describe('GET /clientes/:id', () => {
    it('should return a cliente by id', async () => {
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

      const token = generateToken();

      const response = await supertest(app.getHttpServer())
        .get(`/clientes/${cliente.id_cliente}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toHaveProperty('statusCode', HttpStatus.OK);
      expect(response.body).toHaveProperty('message', 'Cliente encontrado com sucesso');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data.id_cliente).toBe(cliente.id_cliente);
      expect(response.body.data.nome_completo).toBe(cliente.nome_completo);
      expect(response.body.data.email).toBe(cliente.email);
      expect(response.body.data.cnpj).toBe(cliente.cnpj);
      expect(response.body.data.telefone).toBe(cliente.telefone);
    });

    it('should return 404 when cliente is not found', async () => {
      const token = generateToken();

      const response = await supertest(app.getHttpServer())
        .get(`/clientes/${uuidv4()}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });
  });

  describe('PUT /clientes/:id', () => {
    it('should update a cliente', async () => {
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

      const updateClienteDto = {
        nome_completo: 'Cliente Atualizado',
        telefone: '11999999998',
      };

      const token = generateToken();

      const response = await supertest(app.getHttpServer())
        .put(`/clientes/${cliente.id_cliente}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updateClienteDto);

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toHaveProperty('statusCode', HttpStatus.OK);
      expect(response.body).toHaveProperty('message', 'Cliente atualizado com sucesso');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data.nome_completo).toBe(updateClienteDto.nome_completo);
      expect(response.body.data.telefone).toBe(updateClienteDto.telefone);
    });

    it('should return 404 when cliente is not found', async () => {
      const updateClienteDto = {
        nome_completo: 'Cliente Atualizado',
        telefone: '11999999998',
      };

      const token = generateToken();

      const response = await supertest(app.getHttpServer())
        .put(`/clientes/${uuidv4()}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updateClienteDto);

      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });
  });

  describe('DELETE /clientes/:id', () => {
    it('should delete a cliente', async () => {
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

      const token = generateToken();

      const response = await supertest(app.getHttpServer())
        .delete(`/clientes/${cliente.id_cliente}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toHaveProperty('statusCode', HttpStatus.OK);
      expect(response.body).toHaveProperty('message', 'Cliente removido com sucesso');
    });

    it('should return 404 when cliente is not found', async () => {
      const token = generateToken();

      const response = await supertest(app.getHttpServer())
        .delete(`/clientes/${uuidv4()}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });
  });
}); 