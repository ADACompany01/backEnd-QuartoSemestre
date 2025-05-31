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
        Contrato
      ]
    });
  }

  async findOne(id: string): Promise<Orcamento> {
    return this.orcamentoModel.findByPk(id, {
      include: [
        {
          model: Pacote,
          include: [Cliente]
        },
        Contrato
      ]
    });
  }

  async findByPacote(id_pacote: string): Promise<Orcamento> {
    return this.orcamentoModel.findOne({
      where: { id_pacote },
      include: [
        {
          model: Pacote,
          include: [Cliente]
        },
        Contrato
      ]
    });
  }

  async findByCliente(id_cliente: string): Promise<Orcamento[]> {
    return this.orcamentoModel.findAll({
      include: [
        {
          model: Pacote,
          required: true,
          include: [
            {
              model: Cliente,
              required: true,
              where: { id_cliente }
            }
          ]
        },
        Contrato
      ]
    });
  }

  async create(data: Partial<Orcamento>): Promise<Orcamento> {
    return this.orcamentoModel.create(data);
  }

  async update(id: string, data: Partial<Orcamento>): Promise<[number, Orcamento[]]> {
    return this.orcamentoModel.update(data, {
      where: { cod_orcamento: id },
      returning: true
    });
  }

  async delete(id: string): Promise<number> {
    return this.orcamentoModel.destroy({
      where: { cod_orcamento: id }
    });
  }
} 