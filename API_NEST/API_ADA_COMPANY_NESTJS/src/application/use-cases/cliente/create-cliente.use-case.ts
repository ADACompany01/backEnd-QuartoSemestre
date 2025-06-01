import { Cliente } from '../../../infrastructure/database/entities/cliente.entity';
import { ClienteRepositoryImpl } from '../../../infrastructure/database/repositories/cliente.repository';
import { CreateClienteDto } from '../../../interfaces/http/dtos/requests/create-cliente.dto';

export class CreateClienteUseCase {
  constructor(private readonly clienteRepository: ClienteRepositoryImpl) {}

  async execute(data: CreateClienteDto): Promise<Cliente> {
    return this.clienteRepository.create(data);
  }
} 