import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Funcionario } from '../../database/models/funcionario.model';

@Injectable()
export class FuncionarioService {
  private readonly logger = new Logger(FuncionarioService.name);
  
  constructor(
    @InjectModel(Funcionario)
    private funcionarioModel: typeof Funcionario,
  ) {}

  async findAll(): Promise<Funcionario[]> {
    return this.funcionarioModel.findAll({ where: { ativo: true } });
  }

  async findOne(id: string): Promise<Funcionario> {
    const funcionario = await this.funcionarioModel.findOne({ where: { id, ativo: true } });
    if (!funcionario) {
      throw new NotFoundException(`Funcionário com ID ${id} não encontrado`);
    }
    return funcionario;
  }

  async findByEmail(email: string): Promise<Funcionario> {
    const funcionario = await this.funcionarioModel.findOne({ where: { email, ativo: true } });
    if (!funcionario) {
      throw new NotFoundException(`Funcionário com email ${email} não encontrado`);
    }
    return funcionario;
  }

  async findByEmailWithoutException(email: string): Promise<Funcionario | null> {
    return this.funcionarioModel.findOne({ where: { email, ativo: true } });
  }

  async create(funcionarioData: Partial<Funcionario>): Promise<Funcionario> {
    try {
      // Verificar se já existe funcionário com o mesmo email
      const existingByEmail = await this.funcionarioModel.findOne({ 
        where: { email: funcionarioData.email } 
      });
      
      if (existingByEmail) {
        throw new ConflictException(`Funcionário com email ${funcionarioData.email} já existe`);
      }

      // Verificar CPF se fornecido
      if (funcionarioData.cpf) {
        const existingByCpf = await this.funcionarioModel.findOne({
          where: { cpf: funcionarioData.cpf }
        });
        
        if (existingByCpf) {
          throw new ConflictException(`Funcionário com CPF ${funcionarioData.cpf} já existe`);
        }
      }

      // Definir valores padrão se não fornecidos
      const dataToCreate = {
        ...funcionarioData,
        ativo: funcionarioData.ativo ?? true,
        dataCriacao: funcionarioData.dataCriacao ?? new Date(),
      };
      
      // Se CPF estiver vazio, definir como null para evitar problemas de unicidade
      if (!dataToCreate.cpf || dataToCreate.cpf.trim() === '') {
        dataToCreate.cpf = null;
      }
      
      // Criar funcionário
      const funcionario = await this.funcionarioModel.create(dataToCreate);
      return funcionario;
    } catch (error) {
      this.logger.error(`Erro ao criar funcionário: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(id: string, funcionarioData: Partial<Funcionario>): Promise<Funcionario> {
    try {
      const funcionario = await this.findOne(id);
      
      // Verificar email se estiver sendo atualizado
      if (funcionarioData.email && funcionarioData.email !== funcionario.email) {
        const existingByEmail = await this.funcionarioModel.findOne({
          where: { email: funcionarioData.email }
        });
        
        if (existingByEmail) {
          throw new ConflictException(`Funcionário com email ${funcionarioData.email} já existe`);
        }
      }
      
      // Verificar CPF se estiver sendo atualizado
      if (funcionarioData.cpf && funcionarioData.cpf !== funcionario.cpf) {
        const existingByCpf = await this.funcionarioModel.findOne({
          where: { cpf: funcionarioData.cpf }
        });
        
        if (existingByCpf) {
          throw new ConflictException(`Funcionário com CPF ${funcionarioData.cpf} já existe`);
        }
      }
      
      // Se CPF estiver vazio, definir como null para evitar problemas de unicidade
      if (funcionarioData.cpf !== undefined && (!funcionarioData.cpf || funcionarioData.cpf.trim() === '')) {
        funcionarioData.cpf = null;
      }
      
      await funcionario.update(funcionarioData);
      return funcionario.reload();
    } catch (error) {
      this.logger.error(`Erro ao atualizar funcionário: ${error.message}`, error.stack);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const funcionario = await this.findOne(id);
    await funcionario.update({ ativo: false });
  }
}