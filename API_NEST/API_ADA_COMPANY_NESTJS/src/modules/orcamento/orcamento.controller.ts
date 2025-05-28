import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, Logger, HttpException } from '@nestjs/common';
import { OrcamentoService } from './orcamento.service';
import { CreateOrcamentoDto } from './dto/create-orcamento.dto';
import { UpdateOrcamentoDto } from './dto/update-orcamento.dto';
import { OrcamentoResponseDto } from './dto/orcamento-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('orcamentos')
@ApiBearerAuth()
@Controller('orcamentos')
export class OrcamentoController {
  private readonly logger = new Logger(OrcamentoController.name);

  constructor(private readonly orcamentoService: OrcamentoService) {}

  @ApiOperation({ summary: 'Listar todos os orçamentos' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de orçamentos retornada com sucesso',
    type: OrcamentoResponseDto,
    isArray: true
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Token não fornecido ou inválido' 
  })
  @Get()
  async findAll() {
    try {
      const orcamentos = await this.orcamentoService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Orçamentos encontrados com sucesso',
        data: orcamentos,
      };
    } catch (error) {
      this.logger.error(`Erro ao listar orçamentos: ${error.message}`, error.stack);
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao listar orçamentos: ${error.message}`,
        error: error.name,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Buscar orçamento por ID' })
  @ApiParam({ name: 'id', description: 'ID do orçamento' })
  @ApiResponse({ 
    status: 200, 
    description: 'Orçamento encontrado com sucesso',
    type: OrcamentoResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Orçamento não encontrado'
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Token não fornecido ou inválido' 
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const orcamento = await this.orcamentoService.findOne(id);
    return orcamento;
  }

  @ApiOperation({ summary: 'Criar um novo orçamento' })
  @ApiResponse({ 
    status: 201, 
    description: 'Orçamento criado com sucesso',
    type: OrcamentoResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos'
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Erro interno do servidor'
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Token não fornecido ou inválido' 
  })
  @Post()
  async create(@Body() createOrcamentoDto: CreateOrcamentoDto) {
    const orcamento = await this.orcamentoService.create(createOrcamentoDto);
    return orcamento;
  }

  @ApiOperation({ summary: 'Atualizar um orçamento' })
  @ApiParam({ name: 'id', description: 'ID do orçamento' })
  @ApiResponse({ 
    status: 200, 
    description: 'Orçamento atualizado com sucesso',
    type: OrcamentoResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Orçamento não encontrado'
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Token não fornecido ou inválido' 
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrcamentoDto: UpdateOrcamentoDto,
  ) {
    const orcamento = await this.orcamentoService.update(id, updateOrcamentoDto);
    return orcamento;
  }

  @ApiOperation({ summary: 'Remover um orçamento' })
  @ApiParam({ name: 'id', description: 'ID do orçamento' })
  @ApiResponse({ 
    status: 200, 
    description: 'Orçamento removido com sucesso'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Orçamento não encontrado'
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Token não fornecido ou inválido' 
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.orcamentoService.remove(id);
    return { message: 'Orçamento removido com sucesso' };
  }
}