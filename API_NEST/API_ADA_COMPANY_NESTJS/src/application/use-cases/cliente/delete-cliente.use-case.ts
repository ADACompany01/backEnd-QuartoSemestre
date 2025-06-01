import { ClienteRepositoryImpl } from '../../../infrastructure/database/repositories/cliente.repository';

export class DeleteClienteUseCase {
  constructor(private readonly clienteRepository: ClienteRepositoryImpl) {}

  async execute(id: string): Promise<void> {
    await this.clienteRepository.delete(id);
  }
} 