import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cliente } from '../entities/cliente.entity';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class ClienteRepository {
  constructor(
    @InjectModel(Cliente)
    private clienteModel: typeof Cliente,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return this.clienteModel.findAll({
      include: [Usuario]
    });
  }

  async findOne(id: string): Promise<Cliente | null> {
    return this.clienteModel.findByPk(id, {
      include: [Usuario]
    });
  }

  async create(data: Partial<Cliente>): Promise<Cliente> {
    return this.clienteModel.create(data);
  }

  async update(id: string, data: Partial<Cliente>): Promise<[number, Cliente[]]> {
    const [affectedCount, affectedRows] = await this.clienteModel.update(data, {
      where: { id_cliente: id },
      returning: true,
    });
    return [affectedCount, affectedRows];
  }

  async delete(id: string): Promise<number> {
    return this.clienteModel.destroy({
      where: { id_cliente: id },
    });
  }

  async findByEmail(email: string): Promise<Cliente | null> {
    return this.clienteModel.findOne({
      where: { email },
      include: [Usuario]
    });
  }

  async findByCnpj(cnpj: string): Promise<Cliente | null> {
    return this.clienteModel.findOne({
      where: { cnpj },
      include: [Usuario]
    });
  }
} 