import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orcamento } from './orcamento.entity';

@Injectable()
export class OrcamentoService {
  constructor(
    @InjectRepository(Orcamento)
    private orcamentoRepository: Repository<Orcamento>,
  ) {}

  async findAll(): Promise<Orcamento[]> {
    return this.orcamentoRepository.find({ 
      where: { ativo: true }, 
      relations: ['cliente', 'servico', 'servico.funcionario'] 
    });
  }

  async findOne(id: string): Promise<Orcamento> {
    const orcamento = await this.orcamentoRepository.findOne({ 
      where: { id, ativo: true },
      relations: ['cliente', 'servico', 'servico.funcionario']
    });
    
    if (!orcamento) {
      throw new NotFoundException(`Orçamento com ID ${id} não encontrado`);
    }
    
    return orcamento;
  }

  async create(orcamentoData: Partial<Orcamento>): Promise<Orcamento> {
    const orcamento = this.orcamentoRepository.create(orcamentoData);
    return this.orcamentoRepository.save(orcamento);
  }

  async update(id: string, orcamentoData: Partial<Orcamento>): Promise<Orcamento> {
    const orcamento = await this.findOne(id);
    Object.assign(orcamento, orcamentoData);
    return this.orcamentoRepository.save(orcamento);
  }

  async changeStatus(id: string, status: string): Promise<Orcamento> {
    const orcamento = await this.findOne(id);
    orcamento.status = status;
    return this.orcamentoRepository.save(orcamento);
  }

  async remove(id: string): Promise<void> {
    const orcamento = await this.findOne(id);
    orcamento.ativo = false;
    await this.orcamentoRepository.save(orcamento);
  }
}