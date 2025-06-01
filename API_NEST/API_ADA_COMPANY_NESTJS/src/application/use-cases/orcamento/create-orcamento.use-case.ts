import { Orcamento as OrcamentoModel } from '../../../domain/models/orcamento.model';
import { OrcamentoRepository } from '../../../infrastructure/database/repositories/orcamento.repository';
import { CreateOrcamentoDto } from '../../../interfaces/http/dtos/requests/create-orcamento.dto';

export class CreateOrcamentoUseCase {
  constructor(private readonly orcamentoRepository: OrcamentoRepository) {}

  async execute(data: CreateOrcamentoDto): Promise<OrcamentoModel> {
    return this.orcamentoRepository.create({
      ...data,
      data_orcamento: new Date(data.data_orcamento),
      data_validade: new Date(data.data_validade),
    });
  }
} 