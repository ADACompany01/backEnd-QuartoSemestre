import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cliente } from '../../database/models/cliente.model';

@Injectable()
export class ClienteService {
  private readonly logger = new Logger(ClienteService.name);

  constructor(
    @InjectModel(Cliente)
    private clienteModel: typeof Cliente,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return this.clienteModel.findAll({ where: { ativo: true } });
  }

  async findOne(id: string): Promise<Cliente> {
    const cliente = await this.clienteModel.findOne({ where: { id, ativo: true } });
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
    return cliente;
  }

  async findByEmail(email: string): Promise<Cliente> {
    const cliente = await this.clienteModel.findOne({ where: { email, ativo: true } });
    if (!cliente) {
      throw new NotFoundException(`Cliente com email ${email} não encontrado`);
    }
    return cliente;
  }

  async findByEmailWithoutException(email: string): Promise<Cliente | null> {
    return this.clienteModel.findOne({ where: { email, ativo: true } });
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

      // Verificar CPF se fornecido
      if (clienteData.cpf) {
        const existingByCpf = await this.clienteModel.findOne({
          where: { cpf: clienteData.cpf }
        });
        
        if (existingByCpf) {
          throw new ConflictException(`Cliente com CPF ${clienteData.cpf} já existe`);
        }
      }

      // Definir valores padrão se não fornecidos
      const dataToCreate = {
        ...clienteData,
        ativo: clienteData.ativo ?? true,
        dataCriacao: clienteData.dataCriacao ?? new Date(),
      };
      
      // Se CPF estiver vazio, definir como null para evitar problemas de unicidade
      if (!dataToCreate.cpf || dataToCreate.cpf.trim() === '') {
        dataToCreate.cpf = null;
      }
      
      // Criar cliente
      const cliente = await this.clienteModel.create(dataToCreate);
      return cliente;
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
      
      // Verificar CPF se estiver sendo atualizado
      if (clienteData.cpf && clienteData.cpf !== cliente.cpf) {
        const existingByCpf = await this.clienteModel.findOne({
          where: { cpf: clienteData.cpf }
        });
        
        if (existingByCpf) {
          throw new ConflictException(`Cliente com CPF ${clienteData.cpf} já existe`);
        }
      }
      
      // Se CPF estiver vazio, definir como null para evitar problemas de unicidade
      if (clienteData.cpf !== undefined && (!clienteData.cpf || clienteData.cpf.trim() === '')) {
        clienteData.cpf = null;
      }
      
      await cliente.update(clienteData);
      return cliente.reload();
    } catch (error) {
      this.logger.error(`Erro ao atualizar cliente: ${error.message}`, error.stack);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const cliente = await this.findOne(id);
      await cliente.update({ ativo: false });
    } catch (error) {
      this.logger.error(`Erro ao remover cliente: ${error.message}`, error.stack);
      throw error;
    }
  }
}
