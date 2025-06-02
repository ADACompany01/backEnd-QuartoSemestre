import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contrato } from '../../../infrastructure/database/entities/contrato.entity';
import { Cliente } from '../../../infrastructure/database/entities/cliente.entity';
import { Orcamento } from '../../../infrastructure/database/entities/orcamento.entity';
import { Pacote } from '../../../infrastructure/database/entities/pacote.entity';
import { CreateContratoDto } from '../../../interfaces/http/dtos/requests/create-contrato.dto';
import { UpdateContratoDto } from '../../../interfaces/http/dtos/requests/update-contrato.dto';
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
        {
          model: Orcamento,
          include: [{
            model: Pacote,
            include: [Cliente]
          }]
        }
      ]
    });
  }

  async findOne(id: string): Promise<Contrato> {
    const contrato = await this.contratoModel.findByPk(id, {
      include: [
        Cliente,
        {
          model: Orcamento,
          include: [{
            model: Pacote,
            include: [Cliente]
          }]
        }
      ]
    });
    
    if (!contrato) {
      throw new NotFoundException(`Contrato com ID ${id} não encontrado`);
    }
    
    return contrato;
  }

  async create(createContratoDto: CreateContratoDto): Promise<Contrato> {
    try {
      // Verificar se já existe um contrato para o mesmo orçamento
      const existingContrato = await this.contratoModel.findOne({
        where: {
          cod_orcamento: createContratoDto.cod_orcamento
        }
      });

      if (existingContrato) {
        throw new ConflictException('Já existe um contrato para este orçamento');
      }

      // Verificar se o orçamento existe
      const orcamento = await Orcamento.findByPk(createContratoDto.cod_orcamento);
      if (!orcamento) {
        throw new NotFoundException(`Orçamento com ID ${createContratoDto.cod_orcamento} não encontrado`);
      }

      // Converter strings de data para objetos Date
      const contratoData = {
        ...createContratoDto,
        data_inicio: new Date(createContratoDto.data_inicio),
        data_entrega: new Date(createContratoDto.data_entrega)
      };

      const contrato = await this.contratoModel.create(contratoData);
      return this.findOne(contrato.id_contrato);
    } catch (error) {
      this.logger.error(`Erro ao criar contrato: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(id: string, updateContratoDto: UpdateContratoDto): Promise<Contrato> {
    try {
      const contrato = await this.findOne(id);

      // Preparar dados para atualização
      const updateData: Partial<Contrato> = {};

      // Adicionar campos apenas se estiverem presentes no DTO
      if (updateContratoDto.cod_orcamento) {
        updateData.cod_orcamento = updateContratoDto.cod_orcamento;
        // Fetch the new orcamento and its client via package
        const newOrcamento = await this.orcamentoModel.findByPk(updateContratoDto.cod_orcamento, {
          include: [{
            model: Pacote,
            include: [Cliente]
          }]
        });
        if (!newOrcamento || !newOrcamento.pacote || !newOrcamento.pacote.cliente) {
             throw new NotFoundException(`Novo Orçamento com código ${updateContratoDto.cod_orcamento} não encontrado ou associado incorretamente.`);
        }
        updateData.id_cliente = newOrcamento.pacote.cliente.id_cliente; // Update id_cliente based on new orcamento
      }
      if (updateContratoDto.valor_contrato) updateData.valor_contrato = updateContratoDto.valor_contrato;
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