import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  async findAll() {
    const clientes = await this.clienteService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Clientes encontrados com sucesso',
      data: clientes,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const cliente = await this.clienteService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Cliente encontrado com sucesso',
      data: cliente,
    };
  }

  @Post()
  async create(@Body() clienteData: Partial<Cliente>) {
    const cliente = await this.clienteService.create(clienteData);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Cliente criado com sucesso',
      data: cliente,
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() clienteData: Partial<Cliente>) {
    const cliente = await this.clienteService.update(id, clienteData);
    return {
      statusCode: HttpStatus.OK,
      message: 'Cliente atualizado com sucesso',
      data: cliente,
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