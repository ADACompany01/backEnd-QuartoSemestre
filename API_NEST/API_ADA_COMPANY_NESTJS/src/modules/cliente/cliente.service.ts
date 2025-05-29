import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { Cliente } from '../../database/entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import * as bcrypt from 'bcrypt';
import { ClienteRepository } from '../../database/repositories/cliente.repository';
import { UsuarioRepository } from '../../database/repositories/usuario.repository';

@Injectable()
export class ClienteService {
  private readonly logger = new Logger(ClienteService.name);

  constructor(
    private readonly clienteRepository: ClienteRepository,
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.findAll();
  }

  async findOne(id: string): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne(id);
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
    return cliente;
  }

  async findByEmail(email: string): Promise<Cliente> {
    const cliente = await this.clienteRepository.findByEmail(email);
    if (!cliente) {
      throw new NotFoundException(`Cliente com email ${email} não encontrado`);
    }
    return cliente;
  }

  async findByEmailWithoutException(email: string): Promise<Cliente | null> {
    return this.clienteRepository.findByEmail(email);
  }

  async cadastro(createClienteDto: CreateClienteDto) {
    try {
      // Verificar se já existe um cliente com este email
      const existingCliente = await this.findByEmailWithoutException(createClienteDto.email);
      if (existingCliente) {
        throw new ConflictException('Email já cadastrado no sistema');
      }

      // Verificar se já existe um cliente com este CNPJ
      const existingCnpj = await this.clienteRepository.findByCnpj(createClienteDto.cnpj);
      if (existingCnpj) {
        throw new ConflictException('CNPJ já cadastrado no sistema');
      }

      // Criar usuário
      const hashedPassword = await bcrypt.hash(createClienteDto.senha, 10);
      const usuario = await this.usuarioRepository.create({
        email: createClienteDto.email,
        senha: hashedPassword,
        nome_completo: createClienteDto.nome_completo,
        telefone: createClienteDto.telefone
      });

      // Criar cliente
      const cliente = await this.clienteRepository.create({
        nome_completo: createClienteDto.nome_completo,
        cnpj: createClienteDto.cnpj,
        email: createClienteDto.email,
        telefone: createClienteDto.telefone,
        id_usuario: usuario.id_usuario
      });

      // Retornar cliente com usuário
      return this.findOne(cliente.id_cliente);
    } catch (error) {
      this.logger.error(`Erro ao cadastrar cliente: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(id: string, clienteData: Partial<Cliente>): Promise<Cliente> {
    try {
      const cliente = await this.findOne(id);
      
      // Verificar email se estiver sendo atualizado
      if (clienteData.email && clienteData.email !== cliente.email) {
        const existingByEmail = await this.clienteRepository.findByEmail(clienteData.email);
        if (existingByEmail) {
          throw new ConflictException(`Cliente com email ${clienteData.email} já existe`);
        }
      }
      
      // Verificar CNPJ se estiver sendo atualizado
      if (clienteData.cnpj && clienteData.cnpj !== cliente.cnpj) {
        const existingByCnpj = await this.clienteRepository.findByCnpj(clienteData.cnpj);
        if (existingByCnpj) {
          throw new ConflictException(`Cliente com CNPJ ${clienteData.cnpj} já existe`);
        }
      }
      
      await this.clienteRepository.update(id, clienteData);
      return this.findOne(id);
    } catch (error) {
      this.logger.error(`Erro ao atualizar cliente: ${error.message}`, error.stack);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const cliente = await this.findOne(id);
      await this.clienteRepository.delete(id);
    } catch (error) {
      this.logger.error(`Erro ao remover cliente: ${error.message}`, error.stack);
      throw error;
    }
  }
}
