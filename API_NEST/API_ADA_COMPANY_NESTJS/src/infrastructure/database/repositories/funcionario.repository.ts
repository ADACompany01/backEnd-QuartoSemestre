import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Funcionario as FuncionarioEntity } from '../entities/funcionario.entity';
import { FuncionarioRepository } from '../../../domain/repositories/funcionario.repository.interface';
import { Funcionario as FuncionarioModel } from '../../../domain/models/funcionario.model';

@Injectable()
export class FuncionarioRepositoryImpl implements FuncionarioRepository {
  constructor(
    @InjectModel(FuncionarioEntity)
    private funcionarioModel: typeof FuncionarioEntity,
  ) {}

  async create(funcionario: FuncionarioModel): Promise<FuncionarioModel> {
    const created = await this.funcionarioModel.create(funcionario as any);
    return created.toJSON() as FuncionarioModel;
  }

  async findAll(): Promise<FuncionarioModel[]> {
    const funcionarios = await this.funcionarioModel.findAll();
    return funcionarios.map(f => f.toJSON() as FuncionarioModel);
  }

  async findById(id: string): Promise<FuncionarioModel | null> {
    const funcionario = await this.funcionarioModel.findByPk(id);
    return funcionario ? (funcionario.toJSON() as FuncionarioModel) : null;
  }

  async update(id: string, data: Partial<FuncionarioModel>): Promise<[number, FuncionarioModel[]]> {
    const [affectedCount, affectedRows] = await this.funcionarioModel.update(data, {
      where: { id_funcionario: id },
      returning: true,
    });
    return [affectedCount, affectedRows as any];
  }

  async delete(id: string): Promise<number> {
    return this.funcionarioModel.destroy({
      where: { id_funcionario: id },
    });
  }

  async findByEmail(email: string): Promise<FuncionarioEntity | null> {
    return this.funcionarioModel.findOne({
      where: { email },
    });
  }
} 