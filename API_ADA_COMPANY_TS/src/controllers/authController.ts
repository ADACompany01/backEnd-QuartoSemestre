import { Request, Response } from 'express';
import Cliente from '../models/clienteModel';
import Funcionario from '../models/funcionarioModel';
import Orcamento from '../models/orcamentoModel'
import Servico from '../models/servicoModel'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import 'dotenv/config';

interface AuthResponse {
  status: number;
  message: string;
}

// Registrar Cliente
export const registerCliente = async (req: Request, res: Response): Promise<AuthResponse> => {
  const {
    _id,
    nomeCliente,
    telefone,
    endereco: { cep, logradouro, complemento, bairro, localidade, uf, estado, ddd },
    localizacao,
    cnpj,
    usuario: { email, senha, tipoUsuario, telefone: telefoneUsuario, nomeCompleto }
  } = req.body;

  try {
    const cliente = new Cliente({
      _id,
      nomeCliente,
      telefone,
      endereco: {
        cep,
        logradouro,
        complemento,
        bairro,
        localidade,
        uf,
        estado,
        ddd,
      },
      localizacao,
      cnpj,
      usuario: {
        email,
        senha,
        tipoUsuario,
        telefone: telefoneUsuario,
        nomeCompleto
      }
    });

    await cliente.save();
    return { status: 201, message: 'Cliente registrado com sucesso!' };
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) {
      return { status: 500, message: err.message };
    }
    return { status: 500, message: 'Erro desconhecido' };
  }
};

// Registrar Funcionário
export const registerFuncionario = async (req: Request, res: Response): Promise<AuthResponse> => {
  const {
    _id,
    nomeFuncionario,
    endereco: { cep, logradouro, complemento, bairro, localidade, uf, estado, ddd },
    cargo,
    usuario: { email, senha, tipoUsuario, telefone: telefoneUsuario, nomeCompleto },
    chatBot
  } = req.body;

  try {
    const funcionario = new Funcionario({
      _id,
      nomeFuncionario,
      endereco: {
        cep,
        logradouro,
        complemento,
        bairro,
        localidade,
        uf,
        estado,
        ddd
      },
      cargo,
      usuario: {
        email,
        senha,
        tipoUsuario,
        telefone: telefoneUsuario,
        nomeCompleto
      },
      chatBot
    });

    await funcionario.save();
    return { status: 201, message: 'Funcionário registrado com sucesso!' };
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) {
      return { status: 500, message: err.message };
    }
    return { status: 500, message: 'Erro desconhecido' };
  }
};

// Registrar Orçamento
export const registerOrcamento = async (req: Request, res: Response): Promise<AuthResponse> => {
  const { _id, clienteId, validadeOrcamento, dataCriacao, valorTotal, TipoServico, statusOrcamento, descricao, emailVendedor } = req.body;
  try {
      
      const orcamento = new Orcamento({
          _id,
          clienteId,
          validadeOrcamento,
          dataCriacao,
          valorTotal,
          TipoServico,
          statusOrcamento,
          descricao,
          emailVendedor
      });
      await orcamento.save();
      return {status: 201, message: 'Orçamento registrado com sucesso!' };
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) {
      return { status: 500, message: err.message };
    }
    return { status: 500, message: 'Erro desconhecido' };
  }
};

// Registrar Serviço
export const registerServico = async (req: Request, res: Response): Promise<AuthResponse> => {
  const { _id, nome, valor, tipoServico } = req.body;
  try {
      
      const servico = new Servico({
          _id,
          nome,
          valor,
          tipoServico
      });
      await servico.save();
      return {status: 201, message: 'Serviço registrado com sucesso!' };
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        return { status: 500, message: err.message };
      }
      return { status: 500, message: 'Erro desconhecido' };
    }
  };

// Login de usuário (Cliente ou Funcionário)
export const loginUser = async (req: Request): Promise<AuthResponse> => {
  const { email, senha } = req.body;

  try {
    let user = await Cliente.findOne({ 'usuario.email': email }).select('+usuario.senha');
    let tipoUsuario: 'cliente' | 'admin' = 'cliente';

    if (!user) {
      user = await Funcionario.findOne({ 'usuario.email': email }).select('+usuario.senha');
      tipoUsuario = 'admin';
    }

    console.log("Usuário encontrado:", user); 

    if (!user) {
      return { status: 404, message: 'Usuário não encontrado' };
    }

    if (!user.usuario || !user.usuario.senha) {
      return { status: 500, message: 'Senha não encontrada para este usuário' };
    }

    const isMatch = await bcrypt.compare(senha, user.usuario.senha);
    console.log("Senha correta:", isMatch); 

    if (!isMatch) {
      return { status: 400, message: 'Senha incorreta' };
    }

    const token = jwt.sign({ id: user._id, role: tipoUsuario }, config.JWT_SECRET, { expiresIn: '1h' });
    return { status: 200, message: token };
  } catch (err: unknown) {
    console.error("Erro no login:", err);
    if (err instanceof Error) {
      return { status: 500, message: err.message };
    }
    return { status: 500, message: 'Erro desconhecido' };
  }
};
