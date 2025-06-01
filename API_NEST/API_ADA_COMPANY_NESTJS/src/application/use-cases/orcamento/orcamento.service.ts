import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Orcamento } from '../../../infrastructure/database/entities/orcamento.entity';
import { Pacote } from '../../../infrastructure/database/entities/pacote.entity';
import { Contrato } from '../../../infrastructure/database/entities/contrato.entity';
import { Op } from 'sequelize';
import { CreateOrcamentoDto } from '../../../interfaces/http/dtos/requests/create-orcamento.dto';
import { UpdateOrcamentoDto } from '../../../interfaces/http/dtos/requests/update-orcamento.dto';

@Injectable()
export class OrcamentoService {
  private readonly logger = new Logger(OrcamentoService.name);

  constructor(
    @InjectModel(Orcamento)
    private orcamentoModel: typeof Orcamento,
  ) {}

  async findAll(): Promise<Orcamento[]> {
    return this.orcamentoModel.findAll({
      include: [
        {
          model: Pacote,
        },
        Contrato
      ]
    });
  }

  async findOne(id: string): Promise<Orcamento> {
    const orcamento = await this.orcamentoModel.findByPk(id, {
      include: [
        {
          model: Pacote,
        },
        Contrato
      ]
    });
    
    if (!orcamento) {
      throw new NotFoundException(`Orçamento com ID ${id} não encontrado`);
    }
    
    return orcamento;
  }

  async create(orcamentoData: CreateOrcamentoDto): Promise<Orcamento> {
    try {
      const existingOrcamento = await this.orcamentoModel.findOne({
        where: {
          id_pacote: orcamentoData.id_pacote
        }
      });

      if (existingOrcamento) {
        throw new ConflictException(`Já existe um orçamento para este pacote`);
      }

      const pacote = await Pacote.findByPk(orcamentoData.id_pacote);
      if (!pacote) {
        throw new NotFoundException(`Pacote com ID ${orcamentoData.id_pacote} não encontrado`);
      }

      const dataAtual = new Date();
      const dataValidade = new Date();
      dataValidade.setDate(dataValidade.getDate() + 30);

      const orcamento = await this.orcamentoModel.create({
        ...orcamentoData,
        data_orcamento: dataAtual,
        data_validade: dataValidade
      });

      return this.findOne(orcamento.cod_orcamento);
    } catch (error) {
      this.logger.error(`Erro ao criar orçamento: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(id: string, orcamentoData: UpdateOrcamentoDto): Promise<Orcamento> {
    try {
      const orcamento = await this.findOne(id);
      
      if (orcamentoData.id_pacote && orcamentoData.id_pacote !== orcamento.id_pacote) {
        const existingOrcamento = await this.orcamentoModel.findOne({
          where: {
            id_pacote: orcamentoData.id_pacote,
            cod_orcamento: { [Op.ne]: id }
          }
        });

        if (existingOrcamento) {
          throw new ConflictException(`Já existe um orçamento para este pacote`);
        }

        const pacote = await Pacote.findByPk(orcamentoData.id_pacote);
        if (!pacote) {
          throw new NotFoundException(`Pacote com ID ${orcamentoData.id_pacote} não encontrado`);
        }
      }

      await orcamento.update(orcamentoData);
      return this.findOne(id);
    } catch (error) {
      this.logger.error(`Erro ao atualizar orçamento: ${error.message}`, error.stack);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const orcamento = await this.findOne(id);
      await orcamento.destroy();
    } catch (error) {
      this.logger.error(`Erro ao remover orçamento: ${error.message}`, error.stack);
      throw error;
    }
  }
}