import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cliente } from '../../database/models/cliente.model';

@Injectable()
export class ClienteService {
  constructor(
    @InjectModel(Cliente)
    private clienteModel: typeof Cliente,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return this.clienteModel.findAll();
  }

  async findOne(id: string): Promise<Cliente> {
    const cliente = await this.clienteModel.findByPk(id);
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
    return cliente;
  }

  async findByEmail(email: string): Promise<Cliente> {
    const cliente = await this.clienteModel.findOne({ where: { email } });
    return cliente;
  }

  async create(clienteData: Partial<Cliente>): Promise<Cliente> {
    return this.clienteModel.create(clienteData as any);
  }

  async update(id: string, clienteData: Partial<Cliente>): Promise<void> {
    const cliente = await this.findOne(id);
    await cliente.update(clienteData);
  }

  async remove(id: string): Promise<void> {
    const cliente = await this.findOne(id);
    await cliente.destroy();
  }
}
