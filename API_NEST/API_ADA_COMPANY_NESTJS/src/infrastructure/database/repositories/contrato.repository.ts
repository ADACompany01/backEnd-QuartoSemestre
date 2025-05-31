import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contrato } from '../entities/contrato.entity';
import { Cliente } from '../entities/cliente.entity';
import { Orcamento } from '../entities/orcamento.entity';

@Injectable()
export class ContratoRepository {
  constructor(
    @InjectModel(Contrato)
    private contratoModel: typeof Contrato,
  ) {}

  async findAll(): Promise<Contrato[]> {
    return this.contratoModel.findAll({
      include: [Cliente, Orcamento],
    });
  }

  async findOne(id: number): Promise<Contrato | null> {
    return this.contratoModel.findByPk(id, {
      include: [Cliente, Orcamento],
    });
  }

  async create(data: Partial<Contrato>): Promise<Contrato> {
    return this.contratoModel.create(data);
  }

  async update(id: number, data: Partial<Contrato>): Promise<[number, Contrato[]]> {
    const [affectedCount, affectedRows] = await this.contratoModel.update(data, {
      where: { id_contrato: id },
      returning: true,
    });
    return [affectedCount, affectedRows];
  }

  async delete(id: number): Promise<number> {
    return this.contratoModel.destroy({
      where: { id_contrato: id },
    });
  }

  async findByCliente(id_cliente: number): Promise<Contrato[]> {
    return this.contratoModel.findAll({
      where: { id_cliente },
      include: [Cliente, Orcamento],
    });
  }

  async findByOrcamento(cod_orcamento: number): Promise<Contrato[]> {
    return this.contratoModel.findAll({
      where: { cod_orcamento },
      include: [Cliente, Orcamento],
    });
  }
} 