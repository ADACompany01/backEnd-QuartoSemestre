import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Orcamento } from '../entities/orcamento.entity';
import { Pacote } from '../entities/pacote.entity';
import { Cliente } from '../entities/cliente.entity';
import { Contrato } from '../entities/contrato.entity';

@Injectable()
export class OrcamentoRepository {
  constructor(
    @InjectModel(Orcamento)
    private orcamentoModel: typeof Orcamento,
  ) {}

  async findAll(): Promise<Orcamento[]> {
    return this.orcamentoModel.findAll({
      include: [
        {
          model: Pacote,
          include: [Cliente]
        },
        Cliente,
        Contrato
      ]
    });
  }

  async findOne(id: number): Promise<Orcamento> {
    return this.orcamentoModel.findByPk(id, {
      include: [
        {
          model: Pacote,
          include: [Cliente]
        },
        Cliente,
        Contrato
      ]
    });
  }

  async findByPacote(id_pacote: number): Promise<Orcamento> {
    return this.orcamentoModel.findOne({
      where: { id_pacote },
      include: [
        {
          model: Pacote,
          include: [Cliente]
        },
        Cliente,
        Contrato
      ]
    });
  }

  async findByCliente(id_cliente: number): Promise<Orcamento[]> {
    return this.orcamentoModel.findAll({
      where: { id_cliente },
      include: [
        {
          model: Pacote,
          include: [Cliente]
        },
        Cliente,
        Contrato
      ]
    });
  }

  async create(data: Partial<Orcamento>): Promise<Orcamento> {
    return this.orcamentoModel.create(data);
  }

  async update(id: number, data: Partial<Orcamento>): Promise<[number, Orcamento[]]> {
    return this.orcamentoModel.update(data, {
      where: { cod_orcamento: id },
      returning: true
    });
  }

  async delete(id: number): Promise<number> {
    return this.orcamentoModel.destroy({
      where: { cod_orcamento: id }
    });
  }
} 