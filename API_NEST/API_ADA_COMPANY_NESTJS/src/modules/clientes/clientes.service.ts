import { Injectable } from '@nestjs/common';
import { ClienteRepository } from '../../database/repositories/cliente.repository';
import { Cliente } from '../../database/models/cliente.model';

@Injectable()
export class ClientesService {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.findAll();
  }

  async findOne(id: string): Promise<Cliente> {
    return this.clienteRepository.findOne(id);
  }

  async create(data: Partial<Cliente>): Promise<Cliente> {
    return this.clienteRepository.create(data);
  }

  async update(id: string, data: Partial<Cliente>): Promise<[number, Cliente[]]> {
    return this.clienteRepository.update(id, data);
  }

  async delete(id: string): Promise<number> {
    return this.clienteRepository.delete(id);
  }
} 