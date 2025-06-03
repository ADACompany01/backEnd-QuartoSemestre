import { Contrato } from '../../../infrastructure/database/entities/contrato.entity';
import { ContratoRepository } from '../../../infrastructure/database/repositories/contrato.repository';
import { CreateContratoDto } from '../../../interfaces/http/dtos/requests/create-contrato.dto';
import { OrcamentoService } from '../orcamento/orcamento.service';
import { NotFoundException } from '@nestjs/common';

export class CreateContratoUseCase {
  constructor(
    private readonly contratoRepository: ContratoRepository,
    private readonly orcamentoService: OrcamentoService,
  ) {}

  async execute(data: CreateContratoDto): Promise<Contrato> {
    const orcamento = await this.orcamentoService.findOne(data.cod_orcamento);

    if (!orcamento) {
      throw new NotFoundException(`Orçamento com código ${data.cod_orcamento} não encontrado`);
    }

    if (!orcamento.pacote || !orcamento.pacote.id_cliente) {
         throw new NotFoundException(`Informações de cliente não encontradas para o orçamento com código ${data.cod_orcamento}`);
    }
    const id_cliente = orcamento.pacote.id_cliente;

    return this.contratoRepository.create({
      ...data,
      id_cliente: id_cliente,
      data_inicio: new Date(data.data_inicio),
      data_entrega: new Date(data.data_entrega),
    });
  }
} 