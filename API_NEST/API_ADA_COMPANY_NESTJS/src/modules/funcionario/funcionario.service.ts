import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Funcionario } from '../../database/models/funcionario.model';

@Injectable()
export class FuncionarioService {
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
    return this.funcionarioModel.findOne({ where: { email, ativo: true } });
  }

  async create(funcionarioData: Partial<Funcionario>): Promise<Funcionario> {
    const existingFuncionario = await this.funcionarioModel.findOne({ where: { email: funcionarioData.email } });
    if (existingFuncionario) {
      throw new ConflictException(`Funcionário com email ${funcionarioData.email} já existe`);
    }

    const hashedPassword = await bcrypt.hash(funcionarioData.senha, 10);
    
    return this.funcionarioModel.create({
      ...funcionarioData,
      senha: hashedPassword,
    });
  }

  async update(id: string, funcionarioData: Partial<Funcionario>): Promise<Funcionario> {
    const funcionario = await this.findOne(id);
    
    if (funcionarioData.senha) {
      funcionarioData.senha = await bcrypt.hash(funcionarioData.senha, 10);
    }
    
    await funcionario.update(funcionarioData);
    return funcionario.reload();
  }

  async remove(id: string): Promise<void> {
    const funcionario = await this.findOne(id);
    await funcionario.update({ ativo: false });
  }
}