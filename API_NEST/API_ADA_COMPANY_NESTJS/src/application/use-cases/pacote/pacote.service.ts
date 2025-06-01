import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Pacote } from '../../infrastructure/database/entities/pacote.entity';
import { Cliente } from '../../infrastructure/database/entities/cliente.entity';
import { Orcamento } from '../../infrastructure/database/entities/orcamento.entity';
import { CreatePacoteDto } from '../../../interfaces/http/dtos/requests/create-pacote.dto';
import { UpdatePacoteDto } from '../../../interfaces/http/dtos/requests/update-pacote.dto';

@Injectable()
export class PacoteService {
  private readonly logger = new Logger(PacoteService.name);

  constructor(
    @InjectModel(Pacote)
    private pacoteModel: typeof Pacote,
  ) {}

  async findAll(): Promise<Pacote[]> {
    return this.pacoteModel.findAll({
      include: [
        Cliente,
        Orcamento
      ]
    });
  }

  async findOne(id: string): Promise<Pacote> {
    const pacote = await this.pacoteModel.findByPk(id, {
      include: [
        Cliente,
        Orcamento
      ]
    });
    
    if (!pacote) {
      throw new NotFoundException(`Pacote com ID ${id} não encontrado`);
    }
    
    return pacote;
  }

  async create(createPacoteDto: CreatePacoteDto): Promise<Pacote> {
    try {
      // Verificar se o cliente existe
      const cliente = await Cliente.findByPk(createPacoteDto.id_cliente);
      if (!cliente) {
        throw new NotFoundException(`Cliente com ID ${createPacoteDto.id_cliente} não encontrado`);
      }

      return this.pacoteModel.create(createPacoteDto);
    } catch (error) {
      this.logger.error(`Erro ao criar pacote: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(id: string, updatePacoteDto: UpdatePacoteDto): Promise<Pacote> {
    try {
      const pacote = await this.findOne(id);

      // Verificar se o cliente existe se estiver sendo atualizado
      if (updatePacoteDto.id_cliente) {
        const cliente = await Cliente.findByPk(updatePacoteDto.id_cliente);
        if (!cliente) {
          throw new NotFoundException(`Cliente com ID ${updatePacoteDto.id_cliente} não encontrado`);
        }
      }

      await pacote.update(updatePacoteDto);
      return this.findOne(id);
    } catch (error) {
      this.logger.error(`Erro ao atualizar pacote: ${error.message}`, error.stack);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const pacote = await this.findOne(id);
      await pacote.destroy();
    } catch (error) {
      this.logger.error(`Erro ao remover pacote: ${error.message}`, error.stack);
      throw error;
    }
  }
} 