import { Cliente } from '../../../infrastructure/database/entities/cliente.entity';
import { ClienteRepositoryImpl } from '../../../infrastructure/database/repositories/cliente.repository';
import { UpdateClienteDto } from '../../../interfaces/http/dtos/requests/update-cliente.dto';

export class UpdateClienteUseCase {
  constructor(private readonly clienteRepository: ClienteRepositoryImpl) {}

  async execute(id: string, data: UpdateClienteDto): Promise<Cliente> {
    await this.clienteRepository.update(id, data);
    return this.clienteRepository.findById(id);
  }
} 