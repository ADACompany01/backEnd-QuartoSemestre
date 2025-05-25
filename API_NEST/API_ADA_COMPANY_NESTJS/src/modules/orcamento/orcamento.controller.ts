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
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const orcamento = await this.orcamentoService.findOne(Number(id));
      return {
        statusCode: HttpStatus.OK,
        message: 'Orçamento encontrado com sucesso',
        data: orcamento,
      };
    } catch (error) {
      this.logger.error(`Erro ao buscar orçamento: ${error.message}`, error.stack);
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao buscar orçamento: ${error.message}`,
        error: error.name,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
  @Post()
  async create(@Body() createOrcamentoDto: CreateOrcamentoDto) {
    try {
      this.logger.log(`Tentando criar orçamento: ${JSON.stringify(createOrcamentoDto)}`);
      const orcamento = await this.orcamentoService.create(createOrcamentoDto);
      
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Orçamento criado com sucesso',
        data: orcamento,
      };
    } catch (error) {
      this.logger.error(`Erro ao criar orçamento: ${error.message}`, error.stack);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao criar orçamento: ${error.message}`,
        error: error.name,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateOrcamentoDto: UpdateOrcamentoDto) {
    try {
      const orcamento = await this.orcamentoService.update(Number(id), updateOrcamentoDto);
      
      return {
        statusCode: HttpStatus.OK,
        message: 'Orçamento atualizado com sucesso',
        data: orcamento,
      };
    } catch (error) {
      this.logger.error(`Erro ao atualizar orçamento: ${error.message}`, error.stack);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao atualizar orçamento: ${error.message}`,
        error: error.name,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.orcamentoService.remove(Number(id));
      return {
        statusCode: HttpStatus.OK,
        message: 'Orçamento removido com sucesso',
      };
    } catch (error) {
      this.logger.error(`Erro ao remover orçamento: ${error.message}`, error.stack);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao remover orçamento: ${error.message}`,
        error: error.name,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}