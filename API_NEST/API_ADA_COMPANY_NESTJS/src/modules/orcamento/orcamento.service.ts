import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Orcamento } from '../../database/entities/orcamento.entity';
import { Pacote } from '../../database/entities/pacote.entity';
import { Cliente } from '../../database/entities/cliente.entity';
import { Contrato } from '../../database/entities/contrato.entity';
import { Op } from 'sequelize';

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
          include: [Cliente]
        },
        Cliente,
        Contrato
      ]
    });
  }

  async findOne(id: number): Promise<Orcamento> {
    const orcamento = await this.orcamentoModel.findByPk(id, {
      include: [
        {
          model: Pacote,
          include: [Cliente]
        },
        Cliente,
        Contrato
      ]
    });
    
    if (!orcamento) {
      throw new NotFoundException(`Orçamento com ID ${id} não encontrado`);
    }
    
    return orcamento;
  }

  async create(orcamentoData: Partial<Orcamento>): Promise<Orcamento> {
    try {
      // Verificar se já existe um orçamento para o mesmo pacote
      const existingOrcamento = await this.orcamentoModel.findOne({
        where: {
          id_pacote: orcamentoData.id_pacote
        }
      });

      if (existingOrcamento) {
        throw new ConflictException(`Já existe um orçamento para este pacote`);
      }

      // Verificar se o pacote existe
      const pacote = await Pacote.findByPk(orcamentoData.id_pacote);
      if (!pacote) {
        throw new NotFoundException(`Pacote com ID ${orcamentoData.id_pacote} não encontrado`);
      }

      // Verificar se o cliente existe
      const cliente = await Cliente.findByPk(orcamentoData.id_cliente);
      if (!cliente) {
        throw new NotFoundException(`Cliente com ID ${orcamentoData.id_cliente} não encontrado`);
      }

      // Definir data do orçamento como agora
      const dataAtual = new Date();
      const dataValidade = new Date();
      dataValidade.setDate(dataValidade.getDate() + 30); // Validade de 30 dias

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

  async update(id: number, orcamentoData: Partial<Orcamento>): Promise<Orcamento> {
    try {
      const orcamento = await this.findOne(id);
      
      // Verificar se o pacote está sendo alterado
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

        // Verificar se o novo pacote existe
        const pacote = await Pacote.findByPk(orcamentoData.id_pacote);
        if (!pacote) {
          throw new NotFoundException(`Pacote com ID ${orcamentoData.id_pacote} não encontrado`);
        }
      }

      // Verificar se o cliente está sendo alterado
      if (orcamentoData.id_cliente && orcamentoData.id_cliente !== orcamento.id_cliente) {
        const cliente = await Cliente.findByPk(orcamentoData.id_cliente);
        if (!cliente) {
          throw new NotFoundException(`Cliente com ID ${orcamentoData.id_cliente} não encontrado`);
        }
      }
      
      await orcamento.update(orcamentoData);
      return this.findOne(id);
    } catch (error) {
      this.logger.error(`Erro ao atualizar orçamento: ${error.message}`, error.stack);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const orcamento = await this.findOne(id);
      await orcamento.destroy();
    } catch (error) {
      this.logger.error(`Erro ao remover orçamento: ${error.message}`, error.stack);
      throw error;
    }
  }
}