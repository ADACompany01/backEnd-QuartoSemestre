import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cliente } from '../models/cliente.model';

@Injectable()
export class ClienteRepository {
  constructor(
    @InjectModel(Cliente)
    private clienteModel: typeof Cliente,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return this.clienteModel.findAll();
  }

  async findOne(id: string): Promise<Cliente> {
    return this.clienteModel.findByPk(id);
  }

  async create(data: Partial<Cliente>): Promise<Cliente> {
    return this.clienteModel.create(data);
  }

  async update(id: string, data: Partial<Cliente>): Promise<[number, Cliente[]]> {
    const [affectedCount, affectedRows] = await this.clienteModel.update(data, {
      where: { id },
      returning: true,
    });
    return [affectedCount, affectedRows];
  }

  async delete(id: string): Promise<number> {
    return this.clienteModel.destroy({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<Cliente> {
    return this.clienteModel.findOne({
      where: { email },
    });
  }

  async findByCpf(cpf: string): Promise<Cliente> {
    return this.clienteModel.findOne({
      where: { cpf },
    });
  }
} 