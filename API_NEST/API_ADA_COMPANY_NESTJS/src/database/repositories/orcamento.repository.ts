import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Orcamento } from '../models/orcamento.model';
import { Cliente } from '../models/cliente.model';
import { Servico } from '../models/servico.model';

@Injectable()
export class OrcamentoRepository {
  constructor(
    @InjectModel(Orcamento)
    private orcamentoModel: typeof Orcamento,
  ) {}

  async findAll(): Promise<Orcamento[]> {
    return this.orcamentoModel.findAll({
      include: [Cliente, Servico],
    });
  }

  async findOne(id: string): Promise<Orcamento> {
    return this.orcamentoModel.findByPk(id, {
      include: [Cliente, Servico],
    });
  }

  async create(data: Partial<Orcamento>): Promise<Orcamento> {
    return this.orcamentoModel.create(data);
  }

  async update(id: string, data: Partial<Orcamento>): Promise<[number, Orcamento[]]> {
    const [affectedCount, affectedRows] = await this.orcamentoModel.update(data, {
      where: { id },
      returning: true,
    });
    return [affectedCount, affectedRows];
  }

  async delete(id: string): Promise<number> {
    return this.orcamentoModel.destroy({
      where: { id },
    });
  }

  async findByCliente(clienteId: string): Promise<Orcamento[]> {
    return this.orcamentoModel.findAll({
      where: { clienteId },
      include: [Cliente, Servico],
    });
  }

  async findByServico(servicoId: string): Promise<Orcamento[]> {
    return this.orcamentoModel.findAll({
      where: { servicoId },
      include: [Cliente, Servico],
    });
  }

  async findByStatus(status: string): Promise<Orcamento[]> {
    return this.orcamentoModel.findAll({
      where: { status },
      include: [Cliente, Servico],
    });
  }

  async findAtivos(): Promise<Orcamento[]> {
    return this.orcamentoModel.findAll({
      where: { ativo: true },
      include: [Cliente, Servico],
    });
  }
} 