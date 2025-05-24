import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Servico } from '../../database/models/servico.model';
import { Op } from 'sequelize';

@Injectable()
export class ServicoService {
  constructor(
    @InjectModel(Servico)
    private servicoModel: typeof Servico,
  ) {}

  async findAll(): Promise<Servico[]> {
    return this.servicoModel.findAll({ 
      where: { ativo: true },
      include: ['funcionario']
    });
  }

  async findOne(id: string): Promise<Servico> {
    const servico = await this.servicoModel.findOne({ 
      where: { id, ativo: true },
      include: ['funcionario']
    });
    
    if (!servico) {
      throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
    }
    
    return servico;
  }

  async create(servicoData: Partial<Servico>): Promise<Servico> {
    // Verificar se já existe um serviço ativo com o mesmo nome para o mesmo funcionário
    const existingServico = await this.servicoModel.findOne({
      where: {
        nome: servicoData.nome,
        funcionarioId: servicoData.funcionarioId,
        ativo: true
      }
    });

    if (existingServico) {
      throw new ConflictException(`Já existe um serviço ativo com o nome '${servicoData.nome}' para este funcionário`);
    }

    return this.servicoModel.create(servicoData);
  }

  async update(id: string, servicoData: Partial<Servico>): Promise<Servico> {
    const servico = await this.findOne(id);
    
    // Se estiver atualizando o nome, verificar se já existe outro serviço com esse nome
    if (servicoData.nome && servicoData.nome !== servico.nome) {
      const existingServico = await this.servicoModel.findOne({
        where: {
          nome: servicoData.nome,
          funcionarioId: servico.funcionarioId,
          ativo: true,
          id: { [Op.ne]: id } // Excluir o serviço atual da verificação
        }
      });

      if (existingServico) {
        throw new ConflictException(`Já existe um serviço ativo com o nome '${servicoData.nome}' para este funcionário`);
      }
    }
    
    await servico.update(servicoData);
    return servico.reload();
  }

  async remove(id: string): Promise<void> {
    const servico = await this.findOne(id);
    await servico.update({ ativo: false });
  }
}