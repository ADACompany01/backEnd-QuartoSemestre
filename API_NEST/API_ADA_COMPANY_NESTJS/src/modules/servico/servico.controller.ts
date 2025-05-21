import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { ServicoResponseDto } from './dto/servico-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('servicos')
@ApiBearerAuth()
@Controller('servicos')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @ApiOperation({ summary: 'Listar todos os serviços' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de serviços retornada com sucesso',
    type: ServicoResponseDto,
    isArray: true
  })
  @Get()
  async findAll() {
    const servicos = await this.servicoService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Serviços encontrados com sucesso',
      data: servicos.map(servico => servico.toJSON()),
    };
  }

  @ApiOperation({ summary: 'Buscar serviço por ID' })
  @ApiParam({ name: 'id', description: 'ID do serviço' })
  @ApiResponse({ 
    status: 200, 
    description: 'Serviço encontrado com sucesso',
    type: ServicoResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Serviço não encontrado'
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const servico = await this.servicoService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Serviço encontrado com sucesso',
      data: servico.toJSON(),
    };
  }

  @ApiOperation({ summary: 'Criar um novo serviço' })
  @ApiResponse({ 
    status: 201, 
    description: 'Serviço criado com sucesso',
    type: ServicoResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos'
  })
  @Post()
  async create(@Body() createServicoDto: CreateServicoDto) {
    const servico = await this.servicoService.create(createServicoDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Serviço criado com sucesso',
      data: servico.toJSON(),
    };
  }

  @ApiOperation({ summary: 'Atualizar um serviço' })
  @ApiParam({ name: 'id', description: 'ID do serviço' })
  @ApiResponse({ 
    status: 200, 
    description: 'Serviço atualizado com sucesso',
    type: ServicoResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Serviço não encontrado'
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateServicoDto: UpdateServicoDto) {
    const servico = await this.servicoService.update(id, updateServicoDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Serviço atualizado com sucesso',
      data: servico.toJSON(),
    };
  }

  @ApiOperation({ summary: 'Remover um serviço' })
  @ApiParam({ name: 'id', description: 'ID do serviço' })
  @ApiResponse({ 
    status: 200, 
    description: 'Serviço removido com sucesso'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Serviço não encontrado'
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.servicoService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Serviço removido com sucesso',
    };
  }
}