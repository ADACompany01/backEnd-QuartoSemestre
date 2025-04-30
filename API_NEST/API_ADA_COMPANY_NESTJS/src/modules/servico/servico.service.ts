import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servico } from './servico.entity';

@Injectable()
export class ServicoService {
  constructor(
    @InjectRepository(Servico)
    private servicoRepository: Repository<Servico>,
  ) {}

  async findAll(): Promise<Servico[]> {
    return this.servicoRepository.find({ 
      where: { ativo: true },
      relations: ['funcionario'] 
    });
  }

  async findOne(id: string): Promise<Servico> {
    const servico = await this.servicoRepository.findOne({ 
      where: { id, ativo: true },
      relations: ['funcionario']
    });
    
    if (!servico) {
      throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
    }
    
    return servico;
  }

  async create(servicoData: Partial<Servico>): Promise<Servico> {
    const servico = this.servicoRepository.create(servicoData);
    return this.servicoRepository.save(servico);
  }

  async update(id: string, servicoData: Partial<Servico>): Promise<Servico> {
    const servico = await this.findOne(id);
    Object.assign(servico, servicoData);
    return this.servicoRepository.save(servico);
  }

  async remove(id: string): Promise<void> {
    const servico = await this.findOne(id);
    servico.ativo = false;
    await this.servicoRepository.save(servico);
  }
}