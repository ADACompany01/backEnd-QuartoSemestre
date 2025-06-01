import { Contrato } from '../../../infrastructure/database/entities/contrato.entity';
import { ContratoRepository } from '../../../infrastructure/database/repositories/contrato.repository';
import { CreateContratoDto } from '../../../interfaces/http/dtos/requests/create-contrato.dto';

export class CreateContratoUseCase {
  constructor(private readonly contratoRepository: ContratoRepository) {}

  async execute(data: CreateContratoDto): Promise<Contrato> {
    return this.contratoRepository.create({
      ...data,
      data_inicio: new Date(data.data_inicio),
      data_entrega: new Date(data.data_entrega),
    });
  }
} 