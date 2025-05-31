import { ClienteRepository } from '../../../domain/repositories/cliente.repository.interface';

export class DeleteClienteUseCase {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  async execute(id: string): Promise<number> {
    return this.clienteRepository.delete(id);
  }
} 