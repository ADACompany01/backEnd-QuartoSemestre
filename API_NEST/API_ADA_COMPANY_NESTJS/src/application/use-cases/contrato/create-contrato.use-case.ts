import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Contrato as ContratoModel } from '../../../domain/models/contrato.model';
import { ContratoRepository } from '../../../infrastructure/database/repositories/contrato.repository';
import { CreateContratoDto } from '../../../interfaces/http/dtos/requests/create-contrato.dto';
import { ORCAMENTO_REPOSITORY } from '../../../infrastructure/providers/orcamento.provider';
import { OrcamentoRepository } from '../../../infrastructure/database/repositories/orcamento.repository';

@Injectable()
export class CreateContratoUseCase {
  constructor(
    private readonly contratoRepository: ContratoRepository,
    @Inject(ORCAMENTO_REPOSITORY)
    private readonly orcamentoRepository: OrcamentoRepository,
  ) {}

  async execute(data: CreateContratoDto): Promise<ContratoModel> {
    // Buscar o orçamento para obter o id_cliente
    const orcamento = await this.orcamentoRepository.findById(data.cod_orcamento);
    if (!orcamento) {
      throw new NotFoundException(`Orçamento não encontrado para o código ${data.cod_orcamento}`);
    }

    // Obter o id_cliente do orçamento através do pacote
    const id_cliente = (orcamento as any).pacote.id_cliente;

    // Criar o contrato com o id_cliente obtido
    return this.contratoRepository.create({
      ...data,
      id_cliente,
      data_inicio: new Date(data.data_inicio),
      data_entrega: new Date(data.data_entrega),
    });
  }
} 