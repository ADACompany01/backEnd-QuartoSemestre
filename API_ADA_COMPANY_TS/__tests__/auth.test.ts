import request from 'supertest';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRoutes from '../src/routes/authRoutes';
import dotenv from 'dotenv';
import Funcionario from '../src/models/funcionarioModel';
import Cliente from '../src/models/clienteModel';

dotenv.config();

const app: Application = express();
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

function generateRandomId(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomEmail(): string {
  const randomString = Math.random().toString(36).substring(2, 15);
  return `${randomString}@example.com`;
}

describe('Auth Endpoints', () => {
  let clientEmail: string;
  let employeeEmail: string;
  let clientId: number;
  let employeeId: number;

  beforeAll(async () => {
    const dbUri = process.env.MONGODB_URI || '';
    console.log('Conectando ao MongoDB:', dbUri);
    await mongoose.connect(dbUri);
    console.log('Conexão com o MongoDB estabelecida.');
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Aumentar tempo de espera


    // Gerar e-mails dinâmicos para testes
    clientEmail = generateRandomEmail();
    employeeEmail = generateRandomEmail();
    clientId = generateRandomId(100000, 999999);
    employeeId = generateRandomId(100000, 999999);

    // Registrar o cliente para testes de login
    await request(app).post('/api/auth/registerCliente').send({
      _id: clientId,
      nomeCliente: 'Cliente Teste 1',
      telefone: '123456789',
      endereco: {
        cep: '12345678',
        logradouro: 'Rua Cliente',
        complemento: 'complemento',
        bairro: 'Bairro Cliente',
        localidade: 'Cidade Cliente',
        uf: 'SP',
        estado: 'São Paulo',
        ddd: '11',
      },
      localizacao: {
        type: 'Point',
        coordinates: [-46.6333, -23.5505],
      },
      cnpj: '12.345.678/0001-99',
      usuario: {
        email: clientEmail,
        senha: 'senha123',
        tipoUsuario: 'cliente',
        telefone: '987654321',
        nomeCompleto: 'Nome Completo Cliente',
      },
    });

    // Registrar o funcionário para testes de login
    await request(app).post('/api/auth/registerFuncionario').send({
      _id: employeeId,
      nomeFuncionario: 'Teste Funcionario',
      endereco: {
        cep: '12345678',
        logradouro: 'Rua Funcionario',
        complemento: 'complemento',
        bairro: 'Bairro Funcionario',
        localidade: 'Cidade Funcionario',
        uf: 'SP',
        estado: 'São Paulo',
        ddd: '11',
      },
      cargo: 'Desenvolvedor',
      usuario: {
        email: employeeEmail,
        senha: 'senha123',
        tipoUsuario: 'admin',
        telefone: '987654321',
        nomeCompleto: 'Nome Completo Funcionario',
      },
      chatBot: [],
    });
  });

  afterAll(async () => {
    // Deletar o cliente criado no teste, usando o email gerado
    await Cliente.deleteMany({ 'usuario.email': clientEmail });

    // Deletar o funcionário criado no teste, usando o email gerado
    await Funcionario.deleteMany({ 'usuario.email': employeeEmail });

    await mongoose.disconnect();
  });

  describe('POST /api/auth/registerCliente', () => {
    it('Deve registrar um cliente com sucesso', async () => {
      const uniqueEmail = generateRandomEmail();
      const response = await request(app)
        .post('/api/auth/registerCliente')
        .send({
          _id: generateRandomId(100000, 999999),
          nomeCliente: 'Cliente Teste 1',
          telefone: '123456789',
          endereco: {
            cep: '12345678',
            logradouro: 'Rua Teste',
            complemento: 'testecomple',
            bairro: 'Bairro Teste',
            localidade: 'Cidade Teste',
            uf: 'SP',
            estado: 'São Paulo',
            ddd: '11',
          },
          localizacao: {
            type: 'Point',
            coordinates: [-46.6333, -23.5505],
          },
          cnpj: '12.345.678/0001-99',
          usuario: {
            email: uniqueEmail,
            senha: 'senha123',
            tipoUsuario: 'cliente',
            telefone: '987654321',
            nomeCompleto: 'Nome Completo Cliente',
          },
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Cliente registrado com sucesso!');
    });
  });

  describe('POST /api/auth/registerFuncionario', () => {
    it('Deve registrar um funcionário com sucesso', async () => {
      const uniqueEmail = generateRandomEmail();

      const response = await request(app)
        .post('/api/auth/registerFuncionario')
        .send({
          _id: generateRandomId(100000, 999999),
          nomeFuncionario: 'Teste Funcionario 2',
          endereco: {
            cep: '12345678',
            logradouro: 'Rua Funcionario',
            complemento: 'teste',
            bairro: 'Bairro Funcionario',
            localidade: 'Cidade Funcionario',
            uf: 'SP',
            estado: 'São Paulo',
            ddd: '11',
          },
          cargo: 'Desenvolvedor',
          usuario: {
            email: uniqueEmail,
            senha: 'senha123',
            tipoUsuario: 'admin',
            telefone: '987654321',
            nomeCompleto: 'Nome Completo Funcionario',
          },
          chatBot: [],
        });

      expect(response.body.message).toBe('Funcionário registrado com sucesso!');
    });
  });

  describe('POST /api/auth/login', () => {
    it('Deve fazer login de um cliente com sucesso', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: clientEmail,
          senha: 'senha123',
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBeDefined();
    });

    it('Deve fazer login de um funcionário com sucesso', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: employeeEmail,
          senha: 'senha123',
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBeDefined();
    });
  });
});
