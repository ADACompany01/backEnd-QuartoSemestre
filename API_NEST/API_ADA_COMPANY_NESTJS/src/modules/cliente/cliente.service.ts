import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find({ where: { ativo: true } });
  }

  async findOne(id: string): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({ where: { id, ativo: true } });
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
    return cliente;
  }

  async create(clienteData: Partial<Cliente>): Promise<Cliente> {
    const cliente = this.clienteRepository.create(clienteData);
    return this.clienteRepository.save(cliente);
  }

  async update(id: string, clienteData: Partial<Cliente>): Promise<Cliente> {
    const cliente = await this.findOne(id);
    Object.assign(cliente, clienteData);
    return this.clienteRepository.save(cliente);
  }

  async remove(id: string): Promise<void> {
    const cliente = await this.findOne(id);
    cliente.ativo = false;
    await this.clienteRepository.save(cliente);
  }
}