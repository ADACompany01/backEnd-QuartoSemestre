import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { AppModule } from '../../src/app.module';
import { Sequelize } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { Cliente } from '../../src/infrastructure/database/entities/cliente.entity';
import { Usuario } from '../../src/infrastructure/database/entities/usuario.entity';

describe('ClienteController (Integration)', () => {
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

  describe('POST /cliente', () => {
    it('should create a new cliente', async () => {
      const createClienteDto = {
        nome_completo: 'Cliente Teste',
        email: 'cliente@email.com',
        senha: 'senha123',
        cnpj: '12345678900000',
        telefone: '11999999999',
      };

      const response = await supertest(app.getHttpServer())
        .post('/cliente')
        .send(createClienteDto);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id_cliente');
      expect(response.body.nome_completo).toBe(createClienteDto.nome_completo);
      expect(response.body.email).toBe(createClienteDto.email);
      expect(response.body.cnpj).toBe(createClienteDto.cnpj);
      expect(response.body.telefone).toBe(createClienteDto.telefone);
    });

    it('should return 400 when email already exists', async () => {
      // Criar um usuário e cliente de teste
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
        .post('/cliente')
        .send(createClienteDto);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /cliente', () => {
    it('should return a list of clientes', async () => {
      // Criar alguns clientes de teste
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

      const response = await supertest(app.getHttpServer()).get('/cliente');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
    });
  });

  describe('GET /cliente/:id', () => {
    it('should return a cliente by id', async () => {
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

      const response = await supertest(app.getHttpServer()).get(`/cliente/${cliente.id_cliente}`);

      expect(response.status).toBe(200);
      expect(response.body.id_cliente).toBe(cliente.id_cliente);
      expect(response.body.nome_completo).toBe(cliente.nome_completo);
      expect(response.body.email).toBe(cliente.email);
      expect(response.body.cnpj).toBe(cliente.cnpj);
      expect(response.body.telefone).toBe(cliente.telefone);
    });

    it('should return 404 when cliente is not found', async () => {
      const response = await supertest(app.getHttpServer()).get('/cliente/1');

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /cliente/:id', () => {
    it('should update a cliente', async () => {
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

      const updateClienteDto = {
        nome_completo: 'Cliente Atualizado',
        telefone: '11999999998',
      };

      const response = await supertest(app.getHttpServer())
        .put(`/cliente/${cliente.id_cliente}`)
        .send(updateClienteDto);

      expect(response.status).toBe(200);
      expect(response.body.nome_completo).toBe(updateClienteDto.nome_completo);
      expect(response.body.telefone).toBe(updateClienteDto.telefone);
    });

    it('should return 404 when cliente is not found', async () => {
      const updateClienteDto = {
        nome_completo: 'Cliente Atualizado',
        telefone: '11999999998',
      };

      const response = await supertest(app.getHttpServer())
        .put('/cliente/1')
        .send(updateClienteDto);

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /cliente/:id', () => {
    it('should delete a cliente', async () => {
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

      const response = await supertest(app.getHttpServer()).delete(`/cliente/${cliente.id_cliente}`);

      expect(response.status).toBe(200);

      // Verificar se o cliente foi realmente excluído
      const getResponse = await supertest(app.getHttpServer()).get(`/cliente/${cliente.id_cliente}`);
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 when cliente is not found', async () => {
      const response = await supertest(app.getHttpServer()).delete('/cliente/1');

      expect(response.status).toBe(404);
    });
  });
}); 