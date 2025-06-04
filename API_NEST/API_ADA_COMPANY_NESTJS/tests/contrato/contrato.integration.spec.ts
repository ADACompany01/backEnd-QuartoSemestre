import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { AppModule } from '../../src/app.module';
import { Sequelize } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { Contrato } from '../../src/infrastructure/database/entities/contrato.entity';
import { Cliente } from '../../src/infrastructure/database/entities/cliente.entity';
import { Usuario } from '../../src/infrastructure/database/entities/usuario.entity';
import { Orcamento } from '../../src/infrastructure/database/entities/orcamento.entity';
import { Pacote } from '../../src/infrastructure/database/entities/pacote.entity';

describe('ContratoController (Integration)', () => {
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

  describe('POST /contrato', () => {
    it('should create a new contrato', async () => {
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

      // Criar um orçamento de teste
      const orcamento = await Orcamento.create({
        valor_orcamento: 100.00,
        data_orcamento: new Date(),
        data_validade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        id_pacote: pacote.id_pacote,
      });

      const createContratoDto = {
        id_cliente: cliente.id_cliente,
        cod_orcamento: orcamento.cod_orcamento,
        valor_contrato: 100.00,
        status_contrato: 'EM_ANDAMENTO',
        data_inicio: new Date().toISOString(),
        data_entrega: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };

      const response = await supertest(app.getHttpServer())
        .post('/contrato')
        .send(createContratoDto);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id_contrato');
      expect(response.body.id_cliente).toBe(createContratoDto.id_cliente);
      expect(response.body.cod_orcamento).toBe(createContratoDto.cod_orcamento);
      expect(response.body.valor_contrato).toBe(createContratoDto.valor_contrato);
      expect(response.body.status_contrato).toBe(createContratoDto.status_contrato);
    });
  });

  describe('GET /contrato', () => {
    it('should return a list of contratos', async () => {
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

      // Criar um orçamento de teste
      const orcamento = await Orcamento.create({
        valor_orcamento: 100.00,
        data_orcamento: new Date(),
        data_validade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        id_pacote: pacote.id_pacote,
      });

      // Criar alguns contratos de teste
      await Contrato.create({
        id_cliente: cliente.id_cliente,
        cod_orcamento: orcamento.cod_orcamento,
        valor_contrato: 100.00,
        status_contrato: 'EM_ANDAMENTO',
        data_inicio: new Date(),
        data_entrega: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

      await Contrato.create({
        id_cliente: cliente.id_cliente,
        cod_orcamento: orcamento.cod_orcamento,
        valor_contrato: 200.00,
        status_contrato: 'EM_ANDAMENTO',
        data_inicio: new Date(),
        data_entrega: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      });

      const response = await supertest(app.getHttpServer()).get('/contrato');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
    });
  });

  describe('GET /contrato/:id', () => {
    it('should return a contrato by id', async () => {
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

      // Criar um orçamento de teste
      const orcamento = await Orcamento.create({
        valor_orcamento: 100.00,
        data_orcamento: new Date(),
        data_validade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        id_pacote: pacote.id_pacote,
      });

      // Criar um contrato de teste
      const contrato = await Contrato.create({
        id_cliente: cliente.id_cliente,
        cod_orcamento: orcamento.cod_orcamento,
        valor_contrato: 100.00,
        status_contrato: 'EM_ANDAMENTO',
        data_inicio: new Date(),
        data_entrega: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

      const response = await supertest(app.getHttpServer()).get(`/contrato/${contrato.id_contrato}`);

      expect(response.status).toBe(200);
      expect(response.body.id_contrato).toBe(contrato.id_contrato);
      expect(response.body.id_cliente).toBe(contrato.id_cliente);
      expect(response.body.cod_orcamento).toBe(contrato.cod_orcamento);
      expect(response.body.valor_contrato).toBe(contrato.valor_contrato);
      expect(response.body.status_contrato).toBe(contrato.status_contrato);
    });

    it('should return 404 when contrato is not found', async () => {
      const response = await supertest(app.getHttpServer()).get('/contrato/1');

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /contrato/:id', () => {
    it('should update a contrato', async () => {
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

      // Criar um orçamento de teste
      const orcamento = await Orcamento.create({
        valor_orcamento: 100.00,
        data_orcamento: new Date(),
        data_validade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        id_pacote: pacote.id_pacote,
      });

      // Criar um contrato de teste
      const contrato = await Contrato.create({
        id_cliente: cliente.id_cliente,
        cod_orcamento: orcamento.cod_orcamento,
        valor_contrato: 100.00,
        status_contrato: 'EM_ANDAMENTO',
        data_inicio: new Date(),
        data_entrega: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

      const updateContratoDto = {
        valor_contrato: 150.00,
        status_contrato: 'CANCELADO',
      };

      const response = await supertest(app.getHttpServer())
        .put(`/contrato/${contrato.id_contrato}`)
        .send(updateContratoDto);

      expect(response.status).toBe(200);
      expect(response.body.valor_contrato).toBe(updateContratoDto.valor_contrato);
      expect(response.body.status_contrato).toBe(updateContratoDto.status_contrato);
    });

    it('should return 404 when contrato is not found', async () => {
      const updateContratoDto = {
        valor_contrato: 150.00,
        status_contrato: 'CANCELADO',
      };

      const response = await supertest(app.getHttpServer())
        .put('/contrato/1')
        .send(updateContratoDto);

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /contrato/:id', () => {
    it('should delete a contrato', async () => {
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

      // Criar um orçamento de teste
      const orcamento = await Orcamento.create({
        valor_orcamento: 100.00,
        data_orcamento: new Date(),
        data_validade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        id_pacote: pacote.id_pacote,
      });

      // Criar um contrato de teste
      const contrato = await Contrato.create({
        id_cliente: cliente.id_cliente,
        cod_orcamento: orcamento.cod_orcamento,
        valor_contrato: 100.00,
        status_contrato: 'EM_ANDAMENTO',
        data_inicio: new Date(),
        data_entrega: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

      const response = await supertest(app.getHttpServer()).delete(`/contrato/${contrato.id_contrato}`);

      expect(response.status).toBe(200);

      // Verificar se o contrato foi realmente excluído
      const getResponse = await supertest(app.getHttpServer()).get(`/contrato/${contrato.id_contrato}`);
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 when contrato is not found', async () => {
      const response = await supertest(app.getHttpServer()).delete('/contrato/1');

      expect(response.status).toBe(404);
    });
  });
}); 