import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Servico } from '../models/servico.model';
import { Funcionario } from '../models/funcionario.model';

@Injectable()
export class ServicoRepository {
  constructor(
    @InjectModel(Servico)
    private servicoModel: typeof Servico,
  ) {}

  async findAll(): Promise<Servico[]> {
    return this.servicoModel.findAll({
      include: [Funcionario],
    });
  }

  async findOne(id: string): Promise<Servico> {
    return this.servicoModel.findByPk(id, {
      include: [Funcionario],
    });
  }

  async create(data: Partial<Servico>): Promise<Servico> {
    return this.servicoModel.create(data);
  }

  async update(id: string, data: Partial<Servico>): Promise<[number, Servico[]]> {
    const [affectedCount, affectedRows] = await this.servicoModel.update(data, {
      where: { id },
      returning: true,
    });
    return [affectedCount, affectedRows];
  }

  async delete(id: string): Promise<number> {
    return this.servicoModel.destroy({
      where: { id },
    });
  }

  async findByFuncionario(funcionarioId: string): Promise<Servico[]> {
    return this.servicoModel.findAll({
      where: { funcionarioId },
      include: [Funcionario],
    });
  }

  async findAtivos(): Promise<Servico[]> {
    return this.servicoModel.findAll({
      where: { ativo: true },
      include: [Funcionario],
    });
  }
} 