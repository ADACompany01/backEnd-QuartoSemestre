import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Pacote } from '../entities/pacote.entity';
import { Cliente } from '../entities/cliente.entity';
import { Orcamento } from '../entities/orcamento.entity';

@Injectable()
export class PacoteRepository {
  constructor(
    @InjectModel(Pacote)
    private pacoteModel: typeof Pacote,
  ) {}

  async findAll(): Promise<Pacote[]> {
    return this.pacoteModel.findAll({
      include: [Cliente, Orcamento],
    });
  }

  async findOne(id: number): Promise<Pacote | null> {
    return this.pacoteModel.findByPk(id, {
      include: [Cliente, Orcamento],
    });
  }

  async create(data: Partial<Pacote>): Promise<Pacote> {
    return this.pacoteModel.create(data);
  }

  async update(id: number, data: Partial<Pacote>): Promise<[number, Pacote[]]> {
    const [affectedCount, affectedRows] = await this.pacoteModel.update(data, {
      where: { id_pacote: id },
      returning: true,
    });
    return [affectedCount, affectedRows];
  }

  async delete(id: number): Promise<number> {
    return this.pacoteModel.destroy({
      where: { id_pacote: id },
    });
  }

  async findByCliente(id_cliente: number): Promise<Pacote[]> {
    return this.pacoteModel.findAll({
      where: { id_cliente },
      include: [Cliente, Orcamento],
    });
  }
} 