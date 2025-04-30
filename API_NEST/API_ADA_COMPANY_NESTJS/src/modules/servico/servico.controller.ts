import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { Servico } from '../../database/models/servico.model';

@Controller('servicos')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @Get()
  async findAll() {
    const servicos = await this.servicoService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Serviços encontrados com sucesso',
      data: servicos.map(servico => servico.toJSON()),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const servico = await this.servicoService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Serviço encontrado com sucesso',
      data: servico.toJSON(),
    };
  }

  @Post()
  async create(@Body() servicoData: Partial<Servico>) {
    const servico = await this.servicoService.create(servicoData);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Serviço criado com sucesso',
      data: servico.toJSON(),
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() servicoData: Partial<Servico>) {
    const servico = await this.servicoService.update(id, servicoData);
    return {
      statusCode: HttpStatus.OK,
      message: 'Serviço atualizado com sucesso',
      data: servico.toJSON(),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.servicoService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Serviço removido com sucesso',
    };
  }
}