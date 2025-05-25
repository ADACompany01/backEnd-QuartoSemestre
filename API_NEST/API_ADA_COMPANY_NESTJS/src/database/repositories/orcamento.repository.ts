import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Orcamento } from '../entities/orcamento.entity';
import { Cliente } from '../entities/cliente.entity';
import { Pacote } from '../entities/pacote.entity';

@Injectable()
export class OrcamentoRepository {
  constructor(
    @InjectModel(Orcamento)
    private orcamentoModel: typeof Orcamento,
  ) {}

  async findAll(): Promise<Orcamento[]> {
    return this.orcamentoModel.findAll({
      include: [Cliente, Pacote],
    });
  }

  async findOne(id: number): Promise<Orcamento | null> {
    return this.orcamentoModel.findByPk(id, {
      include: [Cliente, Pacote],
    });
  }

  async create(data: Partial<Orcamento>): Promise<Orcamento> {
    return this.orcamentoModel.create(data);
  }

  async update(id: number, data: Partial<Orcamento>): Promise<[number, Orcamento[]]> {
    const [affectedCount, affectedRows] = await this.orcamentoModel.update(data, {
      where: { cod_orcamento: id },
      returning: true,
    });
    return [affectedCount, affectedRows];
  }

  async delete(id: number): Promise<number> {
    return this.orcamentoModel.destroy({
      where: { cod_orcamento: id },
    });
  }

  async findByCliente(id_cliente: number): Promise<Orcamento[]> {
    return this.orcamentoModel.findAll({
      where: { id_cliente },
      include: [Cliente, Pacote],
    });
  }

  async findByPacote(id_pacote: number): Promise<Orcamento[]> {
    return this.orcamentoModel.findAll({
      where: { id_pacote },
      include: [Cliente, Pacote],
    });
  }
} 