import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Funcionario } from '../models/funcionario.model';

@Injectable()
export class FuncionarioRepository {
  constructor(
    @InjectModel(Funcionario)
    private funcionarioModel: typeof Funcionario,
  ) {}

  async findAll(): Promise<Funcionario[]> {
    return this.funcionarioModel.findAll();
  }

  async findOne(id: string): Promise<Funcionario> {
    return this.funcionarioModel.findByPk(id);
  }

  async create(data: Partial<Funcionario>): Promise<Funcionario> {
    return this.funcionarioModel.create(data);
  }

  async update(id: string, data: Partial<Funcionario>): Promise<[number, Funcionario[]]> {
    const [affectedCount, affectedRows] = await this.funcionarioModel.update(data, {
      where: { id },
      returning: true,
    });
    return [affectedCount, affectedRows];
  }

  async delete(id: string): Promise<number> {
    return this.funcionarioModel.destroy({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<Funcionario> {
    return this.funcionarioModel.findOne({
      where: { email },
    });
  }

  async findByCpf(cpf: string): Promise<Funcionario> {
    return this.funcionarioModel.findOne({
      where: { cpf },
    });
  }

  async findByEspecialidade(especialidade: string): Promise<Funcionario[]> {
    return this.funcionarioModel.findAll({
      where: { especialidade },
    });
  }
} 