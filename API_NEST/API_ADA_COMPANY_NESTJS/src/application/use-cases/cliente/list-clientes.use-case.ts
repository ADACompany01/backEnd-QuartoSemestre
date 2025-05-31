import { ClienteRepository } from '../../../domain/repositories/cliente.repository.interface';
import { Cliente } from '../../../domain/models/cliente.model';

export class ListClientesUseCase {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  async execute(): Promise<Cliente[]> {
    return this.clienteRepository.findAll();
  }
} 