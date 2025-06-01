import { Contrato } from '../../../infrastructure/database/entities/contrato.entity';
import { ContratoRepository } from '../../../infrastructure/database/repositories/contrato.repository';
import { UpdateContratoDto } from '../../../interfaces/http/dtos/requests/update-contrato.dto';

export class UpdateContratoUseCase {
  constructor(private readonly contratoRepository: ContratoRepository) {}

  async execute(id: string, data: UpdateContratoDto): Promise<Contrato> {
    await this.contratoRepository.update(id, data);
    return this.contratoRepository.findById(id);
  }
} 