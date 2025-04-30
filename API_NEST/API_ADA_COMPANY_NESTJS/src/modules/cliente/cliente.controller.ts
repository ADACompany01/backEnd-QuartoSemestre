import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from '../../database/models/cliente.model';

@Controller('clientes')
export class ClienteController {
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

  @Post()
  async create(@Body() clienteData: Partial<Cliente>) {
    const cliente = await this.clienteService.create(clienteData);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Cliente criado com sucesso',
      data: cliente.toJSON(),
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() clienteData: Partial<Cliente>) {
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