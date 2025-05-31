import { ClienteRepository } from '../../../domain/repositories/cliente.repository.interface';
import { Cliente } from '../../../domain/models/cliente.model';

export class CreateClienteUseCase {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  async execute(data: Cliente): Promise<Cliente> {
    return this.clienteRepository.create(data);
  }
} 