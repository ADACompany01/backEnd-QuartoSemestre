import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, Patch } from '@nestjs/common';
import { OrcamentoService } from './orcamento.service';
import { Orcamento } from './orcamento.entity';

@Controller('orcamentos')
export class OrcamentoController {
  constructor(private readonly orcamentoService: OrcamentoService) {}

  @Get()
  async findAll() {
    const orcamentos = await this.orcamentoService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Orçamentos encontrados com sucesso',
      data: orcamentos,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const orcamento = await this.orcamentoService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Orçamento encontrado com sucesso',
      data: orcamento,
    };
  }

  @Post()
  async create(@Body() orcamentoData: Partial<Orcamento>) {
    const orcamento = await this.orcamentoService.create(orcamentoData);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Orçamento criado com sucesso',
      data: orcamento,
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() orcamentoData: Partial<Orcamento>) {
    const orcamento = await this.orcamentoService.update(id, orcamentoData);
    return {
      statusCode: HttpStatus.OK,
      message: 'Orçamento atualizado com sucesso',
      data: orcamento,
    };
  }

  @Patch(':id/status')
  async changeStatus(@Param('id') id: string, @Body('status') status: string) {
    const orcamento = await this.orcamentoService.changeStatus(id, status);
    return {
      statusCode: HttpStatus.OK,
      message: `Status do orçamento alterado para ${status} com sucesso`,
      data: orcamento,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.orcamentoService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Orçamento removido com sucesso',
    };
  }
}