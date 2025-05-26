import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cliente } from '../../database/entities/cliente.entity';
import { Usuario } from '../../database/entities/usuario.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClienteService {
  private readonly logger = new Logger(ClienteService.name);

  constructor(
    @InjectModel(Cliente)
    private clienteModel: typeof Cliente,
    @InjectModel(Usuario)
    private usuarioModel: typeof Usuario,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return this.clienteModel.findAll({
      include: [Usuario]
    });
  }

  async findOne(id: string): Promise<Cliente> {
    const cliente = await this.clienteModel.findByPk(id, {
      include: [Usuario]
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
    return cliente;
  }

  async findByEmail(email: string): Promise<Cliente> {
    const cliente = await this.clienteModel.findOne({ 
      where: { email },
      include: [Usuario]
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente com email ${email} não encontrado`);
    }
    return cliente;
  }

  async findByEmailWithoutException(email: string): Promise<Cliente | null> {
    return this.clienteModel.findOne({ 
      where: { email },
      include: [Usuario]
    });
  }

  async create(clienteData: Partial<Cliente>): Promise<Cliente> {
    try {
      // Verificar se já existe cliente com o mesmo email
      const existingByEmail = await this.clienteModel.findOne({ 
        where: { email: clienteData.email } 
      });
      
      if (existingByEmail) {
        throw new ConflictException(`Cliente com email ${clienteData.email} já existe`);
      }

      // Verificar CNPJ se fornecido
      if (clienteData.cnpj) {
        const existingByCnpj = await this.clienteModel.findOne({
          where: { cnpj: clienteData.cnpj }
        });
        
        if (existingByCnpj) {
          throw new ConflictException(`Cliente com CNPJ ${clienteData.cnpj} já existe`);
        }
      }
      
      // Criar cliente
      const cliente = await this.clienteModel.create(clienteData);
      return this.findOne(cliente.id_cliente);
    } catch (error) {
      this.logger.error(`Erro ao criar cliente: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(id: string, clienteData: Partial<Cliente>): Promise<Cliente> {
    try {
      const cliente = await this.findOne(id);
      
      // Verificar email se estiver sendo atualizado
      if (clienteData.email && clienteData.email !== cliente.email) {
        const existingByEmail = await this.clienteModel.findOne({
          where: { email: clienteData.email }
        });
        
        if (existingByEmail) {
          throw new ConflictException(`Cliente com email ${clienteData.email} já existe`);
        }
      }
      
      // Verificar CNPJ se estiver sendo atualizado
      if (clienteData.cnpj && clienteData.cnpj !== cliente.cnpj) {
        const existingByCnpj = await this.clienteModel.findOne({
          where: { cnpj: clienteData.cnpj }
        });
        
        if (existingByCnpj) {
          throw new ConflictException(`Cliente com CNPJ ${clienteData.cnpj} já existe`);
        }
      }
      
      await cliente.update(clienteData);
      return this.findOne(id);
    } catch (error) {
      this.logger.error(`Erro ao atualizar cliente: ${error.message}`, error.stack);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const cliente = await this.findOne(id);
      await cliente.destroy();
    } catch (error) {
      this.logger.error(`Erro ao remover cliente: ${error.message}`, error.stack);
      throw error;
    }
  }

  async cadastro(createClienteDto: CreateClienteDto) {
    try {
      // Verificar se já existe um cliente com este email
      const existingCliente = await this.findByEmailWithoutException(createClienteDto.email);
      if (existingCliente) {
        throw new ConflictException('Email já cadastrado no sistema');
      }

      // Criar usuário
      const hashedPassword = await bcrypt.hash(createClienteDto.senha, 10);
      const usuario = await this.usuarioModel.create({
        email: createClienteDto.email,
        senha: hashedPassword,
        nome_completo: createClienteDto.nome_completo,
        telefone: createClienteDto.telefone
      });

      // Criar cliente
      const cliente = await this.clienteModel.create({
        ...createClienteDto,
        id_usuario: usuario.id_usuario
      });

      // Retornar cliente com usuário
      return this.findOne(cliente.id_cliente);
    } catch (error) {
      this.logger.error(`Erro ao cadastrar cliente: ${error.message}`, error.stack);
      throw error;
    }
  }
}
