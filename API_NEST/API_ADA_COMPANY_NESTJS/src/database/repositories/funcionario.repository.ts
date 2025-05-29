import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Funcionario } from '../entities/funcionario.entity';

@Injectable()
export class FuncionarioRepository {
  constructor(
    @InjectModel(Funcionario)
    private funcionarioModel: typeof Funcionario,
  ) {}

  async findAll(): Promise<Funcionario[]> {
    return this.funcionarioModel.findAll();
  }

  async findOne(id: number): Promise<Funcionario | null> {
    return this.funcionarioModel.findByPk(id);
  }

  async create(data: Partial<Funcionario>): Promise<Funcionario> {
    return this.funcionarioModel.create(data);
  }

  async update(id: number, data: Partial<Funcionario>): Promise<[number, Funcionario[]]> {
    const [affectedCount, affectedRows] = await this.funcionarioModel.update(data, {
      where: { id_funcionario: id },
      returning: true,
    });
    return [affectedCount, affectedRows];
  }

  async delete(id: number): Promise<number> {
    return this.funcionarioModel.destroy({
      where: { id_funcionario: id },
    });
  }

  async findByEmail(email: string): Promise<Funcionario | null> {
    return this.funcionarioModel.findOne({
      where: { email },
    });
  }

} 