import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cliente } from '../entities/cliente.entity';
import { Usuario } from '../entities/usuario.entity';
import { ClienteRepository } from '../../../domain/repositories/cliente.repository.interface';
import { Cliente as ClienteModel } from '../../../domain/models/cliente.model';

@Injectable()
export class ClienteRepositoryImpl implements ClienteRepository {
  constructor(
    @InjectModel(Cliente)
    private clienteModel: typeof Cliente,
  ) {}

  async findAll(): Promise<ClienteModel[]> {
    const clientes = await this.clienteModel.findAll({
      include: [Usuario]
    });
    return clientes.map(c => c.toJSON() as ClienteModel);
  }

  async findOne(id: string): Promise<Cliente | null> {
    return this.clienteModel.findByPk(id, {
      include: [Usuario]
    });
  }

  async create(cliente: ClienteModel): Promise<ClienteModel> {
    const created = await this.clienteModel.create(cliente as any);
    return created.toJSON() as ClienteModel;
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

  async findById(id: string): Promise<ClienteModel | null> {
    const cliente = await this.clienteModel.findByPk(id);
    return cliente ? (cliente.toJSON() as ClienteModel) : null;
  }
} 