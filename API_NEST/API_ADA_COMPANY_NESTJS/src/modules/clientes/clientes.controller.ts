import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { Cliente } from '../../database/models/cliente.model';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  async findAll(): Promise<Cliente[]> {
    return this.clientesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cliente> {
    return this.clientesService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<Cliente>): Promise<Cliente> {
    return this.clientesService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Cliente>): Promise<[number, Cliente[]]> {
    return this.clientesService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<number> {
    return this.clientesService.delete(id);
  }
} 