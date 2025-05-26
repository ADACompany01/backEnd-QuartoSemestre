import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contrato } from '../../database/entities/contrato.entity';
import { Cliente } from '../../database/entities/cliente.entity';
import { Orcamento } from '../../database/entities/orcamento.entity';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { Op } from 'sequelize';

@Injectable()
export class ContratoService {
  private readonly logger = new Logger(ContratoService.name);

  constructor(
    @InjectModel(Contrato)
    private contratoModel: typeof Contrato,
    @InjectModel(Cliente)
    private clienteModel: typeof Cliente,
    @InjectModel(Orcamento)
    private orcamentoModel: typeof Orcamento,
  ) {}

  async findAll(): Promise<Contrato[]> {
    return this.contratoModel.findAll({
      include: [
        Cliente,
        Orcamento
      ]
    });
  }

  async findOne(id: string): Promise<Contrato> {
    const contrato = await this.contratoModel.findByPk(id, {
      include: [
        Cliente,
        Orcamento
      ]
    });
    
    if (!contrato) {
      throw new NotFoundException(`Contrato com ID ${id} não encontrado`);
    }
    
    return contrato;
  }

  async create(createContratoDto: CreateContratoDto): Promise<Contrato> {
    try {
      // Verificar se o cliente existe
      const cliente = await this.clienteModel.findByPk(createContratoDto.id_cliente);
      if (!cliente) {
        throw new NotFoundException(`Cliente com ID ${createContratoDto.id_cliente} não encontrado`);
      }

      // Verificar se o orçamento existe
      const orcamento = await this.orcamentoModel.findByPk(createContratoDto.cod_orcamento);
      if (!orcamento) {
        throw new NotFoundException(`Orçamento com código ${createContratoDto.cod_orcamento} não encontrado`);
      }

      // Verificar se já existe um contrato para este orçamento
      const existingContrato = await this.contratoModel.findOne({
        where: { cod_orcamento: createContratoDto.cod_orcamento }
      });

      if (existingContrato) {
        throw new ConflictException(`Já existe um contrato para este orçamento`);
      }

      // Converter strings de data para objetos Date
      const contratoData = {
        ...createContratoDto,
        data_inicio: new Date(createContratoDto.data_inicio),
        data_entrega: new Date(createContratoDto.data_entrega)
      };

      return this.contratoModel.create(contratoData);
    } catch (error) {
      this.logger.error(`Erro ao criar contrato: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(id: string, updateContratoDto: UpdateContratoDto): Promise<Contrato> {
    try {
      const contrato = await this.findOne(id);

      // Verificar se o cliente existe se estiver sendo atualizado
      if (updateContratoDto.id_cliente) {
        const cliente = await this.clienteModel.findByPk(updateContratoDto.id_cliente);
        if (!cliente) {
          throw new NotFoundException(`Cliente com ID ${updateContratoDto.id_cliente} não encontrado`);
        }
      }

      // Verificar se o orçamento existe se estiver sendo atualizado
      if (updateContratoDto.cod_orcamento) {
        const orcamento = await this.orcamentoModel.findByPk(updateContratoDto.cod_orcamento);
        if (!orcamento) {
          throw new NotFoundException(`Orçamento com código ${updateContratoDto.cod_orcamento} não encontrado`);
        }

        // Verificar se já existe outro contrato para este orçamento
        const existingContrato = await this.contratoModel.findOne({
          where: { 
            cod_orcamento: updateContratoDto.cod_orcamento,
            id: { [Op.ne]: id }
          }
        });

        if (existingContrato) {
          throw new ConflictException(`Já existe um contrato para este orçamento`);
        }
      }

      // Preparar dados para atualização
      const updateData: Partial<Contrato> = {};

      // Adicionar campos apenas se estiverem presentes no DTO
      if (updateContratoDto.id_cliente) updateData.id_cliente = updateContratoDto.id_cliente;
      if (updateContratoDto.valor_contrato) updateData.valor_contrato = updateContratoDto.valor_contrato;
      if (updateContratoDto.cod_orcamento) updateData.cod_orcamento = updateContratoDto.cod_orcamento;
      if (updateContratoDto.status_contrato) updateData.status_contrato = updateContratoDto.status_contrato;
      if (updateContratoDto.data_inicio) updateData.data_inicio = new Date(updateContratoDto.data_inicio);
      if (updateContratoDto.data_entrega) updateData.data_entrega = new Date(updateContratoDto.data_entrega);

      await contrato.update(updateData);
      return this.findOne(id);
    } catch (error) {
      this.logger.error(`Erro ao atualizar contrato: ${error.message}`, error.stack);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const contrato = await this.findOne(id);
      await contrato.destroy();
    } catch (error) {
      this.logger.error(`Erro ao remover contrato: ${error.message}`, error.stack);
      throw error;
    }
  }
} 