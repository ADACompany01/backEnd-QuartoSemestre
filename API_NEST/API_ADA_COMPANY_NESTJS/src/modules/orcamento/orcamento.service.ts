import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Orcamento } from '../../database/models/orcamento.model';
import { Op } from 'sequelize';

@Injectable()
export class OrcamentoService {
  constructor(
    @InjectModel(Orcamento)
    private orcamentoModel: typeof Orcamento,
  ) {}

  async findAll(): Promise<Orcamento[]> {
    return this.orcamentoModel.findAll({ 
      where: { ativo: true },
      include: [
        'cliente',
        {
          association: 'servico',
          include: ['funcionario']
        }
      ]
    });
  }

  async findOne(id: string): Promise<Orcamento> {
    const orcamento = await this.orcamentoModel.findOne({ 
      where: { id, ativo: true },
      include: [
        'cliente',
        {
          association: 'servico',
          include: ['funcionario']
        }
      ]
    });
    
    if (!orcamento) {
      throw new NotFoundException(`Orçamento com ID ${id} não encontrado`);
    }
    
    return orcamento;
  }

  async create(orcamentoData: Partial<Orcamento>): Promise<Orcamento> {
    // Verificar se já existe um orçamento para o mesmo cliente e serviço na mesma data
    const existingOrcamento = await this.orcamentoModel.findOne({
      where: {
        clienteId: orcamentoData.clienteId,
        servicoId: orcamentoData.servicoId,
        dataServico: orcamentoData.dataServico,
        ativo: true,
        status: { [Op.ne]: 'cancelado' } // Ignorar orçamentos cancelados
      }
    });

    if (existingOrcamento) {
      throw new ConflictException(`Já existe um orçamento ativo para este cliente e serviço na data especificada`);
    }

    return this.orcamentoModel.create(orcamentoData);
  }

  async update(id: string, orcamentoData: Partial<Orcamento>): Promise<Orcamento> {
    const orcamento = await this.findOne(id);
    
    // Verificar se a atualização não cria duplicata
    if (
      (orcamentoData.clienteId && orcamentoData.clienteId !== orcamento.clienteId) ||
      (orcamentoData.servicoId && orcamentoData.servicoId !== orcamento.servicoId) ||
      (orcamentoData.dataServico && orcamentoData.dataServico !== orcamento.dataServico)
    ) {
      const existingOrcamento = await this.orcamentoModel.findOne({
        where: {
          clienteId: orcamentoData.clienteId || orcamento.clienteId,
          servicoId: orcamentoData.servicoId || orcamento.servicoId,
          dataServico: orcamentoData.dataServico || orcamento.dataServico,
          ativo: true,
          id: { [Op.ne]: id }, // Excluir o orçamento atual da verificação
          status: { [Op.ne]: 'cancelado' } // Ignorar orçamentos cancelados
        }
      });

      if (existingOrcamento) {
        throw new ConflictException(`Já existe um orçamento ativo para este cliente e serviço na data especificada`);
      }
    }
    
    await orcamento.update(orcamentoData);
    return orcamento.reload();
  }

  async changeStatus(id: string, status: string): Promise<Orcamento> {
    const orcamento = await this.findOne(id);
    await orcamento.update({ status });
    return orcamento.reload();
  }

  async remove(id: string): Promise<void> {
    const orcamento = await this.findOne(id);
    await orcamento.update({ ativo: false });
  }
}