import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, Logger, HttpException } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from '../../database/models/cliente.model';
import { Public } from '../auth/decorators/public.decorator';
import * as bcrypt from 'bcrypt';

@Controller('clientes')
export class ClienteController {
  private readonly logger = new Logger(ClienteController.name);
  
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  async findAll() {
    const clientes = await this.clienteService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Clientes encontrados com sucesso',
      data: clientes.map(cliente => cliente.toJSON()),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const cliente = await this.clienteService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Cliente encontrado com sucesso',
      data: cliente.toJSON(),
    };
  }

  @Public()
  @Post()
  async create(@Body() clienteData: Partial<Cliente>) {
    try {
      this.logger.log(`Tentando criar cliente: ${JSON.stringify(clienteData)}`);
      
      // Criptografar senha se fornecida
      if (clienteData.senha) {
        const salt = await bcrypt.genSalt();
        clienteData.senha = await bcrypt.hash(clienteData.senha, salt);
      }
      
      const cliente = await this.clienteService.create(clienteData);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Cliente criado com sucesso',
        data: cliente.toJSON(),
      };
    } catch (error) {
      this.logger.error(`Erro ao criar cliente: ${error.message}`, error.stack);
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao criar cliente: ${error.message}`,
        error: error.name,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() clienteData: Partial<Cliente>) {
    // Criptografar senha se fornecida
    if (clienteData.senha) {
      const salt = await bcrypt.genSalt();
      clienteData.senha = await bcrypt.hash(clienteData.senha, salt);
    }
    
    await this.clienteService.update(id, clienteData);
    const clienteAtualizado = await this.clienteService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Cliente atualizado com sucesso',
      data: clienteAtualizado.toJSON(),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.clienteService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Cliente removido com sucesso',
    };
  }
}