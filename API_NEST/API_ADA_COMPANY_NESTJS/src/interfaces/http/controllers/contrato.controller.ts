import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ContratoService } from './contrato.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { ContratoResponseDto } from '../../shared/dto/common-response.dto';
import { FuncionarioGuard } from '../auth/guards/funcionario.guard';

@ApiTags('contratos')
@ApiBearerAuth()
@Controller('contratos')
@UseGuards(FuncionarioGuard)
export class ContratoController {
  constructor(private readonly contratoService: ContratoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo contrato' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Contrato criado com sucesso',
    type: ContratoResponseDto 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Dados inválidos fornecidos' 
  })
  @ApiResponse({ 
    status: HttpStatus.CONFLICT, 
    description: 'Já existe um contrato para este orçamento' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Token não fornecido ou inválido' 
  })
  create(@Body() createContratoDto: CreateContratoDto) {
    return this.contratoService.create(createContratoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os contratos' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Lista de contratos retornada com sucesso',
    type: [ContratoResponseDto]
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Token não fornecido ou inválido' 
  })
  findAll() {
    return this.contratoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um contrato pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do contrato' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Contrato encontrado com sucesso',
    type: ContratoResponseDto 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Contrato não encontrado' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Token não fornecido ou inválido' 
  })
  async findOne(@Param('id') id: string) {
    return this.contratoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um contrato' })
  @ApiParam({ name: 'id', description: 'ID do contrato' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Contrato atualizado com sucesso',
    type: ContratoResponseDto 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Contrato não encontrado' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Dados inválidos fornecidos' 
  })
  @ApiResponse({ 
    status: HttpStatus.CONFLICT, 
    description: 'Já existe um contrato para este orçamento' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Token não fornecido ou inválido' 
  })
  async update(
    @Param('id') id: string,
    @Body() updateContratoDto: UpdateContratoDto,
  ) {
    return this.contratoService.update(id, updateContratoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um contrato' })
  @ApiParam({ name: 'id', description: 'ID do contrato' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Contrato removido com sucesso' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Contrato não encontrado' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Token não fornecido ou inválido' 
  })
  async remove(@Param('id') id: string) {
    return this.contratoService.remove(id);
  }
} 