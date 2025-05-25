import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, Logger, HttpException } from '@nestjs/common';
import { PacoteService } from './pacote.service';
import { CreatePacoteDto } from './dto/create-pacote.dto';
import { UpdatePacoteDto } from './dto/update-pacote.dto';
import { PacoteResponseDto } from './dto/pacote-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('pacotes')
@ApiBearerAuth()
@Controller('pacotes')
export class PacoteController {
  private readonly logger = new Logger(PacoteController.name);

  constructor(private readonly pacoteService: PacoteService) {}

  @ApiOperation({ summary: 'Listar todos os pacotes' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de pacotes retornada com sucesso',
    type: PacoteResponseDto,
    isArray: true
  })
  @Get()
  async findAll() {
    try {
      const pacotes = await this.pacoteService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Pacotes encontrados com sucesso',
        data: pacotes,
      };
    } catch (error) {
      this.logger.error(`Erro ao listar pacotes: ${error.message}`, error.stack);
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao listar pacotes: ${error.message}`,
        error: error.name,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Buscar pacote por ID' })
  @ApiParam({ name: 'id', description: 'ID do pacote' })
  @ApiResponse({ 
    status: 200, 
    description: 'Pacote encontrado com sucesso',
    type: PacoteResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Pacote não encontrado'
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const pacote = await this.pacoteService.findOne(Number(id));
      return {
        statusCode: HttpStatus.OK,
        message: 'Pacote encontrado com sucesso',
        data: pacote,
      };
    } catch (error) {
      this.logger.error(`Erro ao buscar pacote: ${error.message}`, error.stack);
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao buscar pacote: ${error.message}`,
        error: error.name,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Criar um novo pacote' })
  @ApiResponse({ 
    status: 201, 
    description: 'Pacote criado com sucesso',
    type: PacoteResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos'
  })
  @Post()
  async create(@Body() createPacoteDto: CreatePacoteDto) {
    try {
      const pacote = await this.pacoteService.create(createPacoteDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Pacote criado com sucesso',
        data: pacote,
      };
    } catch (error) {
      this.logger.error(`Erro ao criar pacote: ${error.message}`, error.stack);
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao criar pacote: ${error.message}`,
        error: error.name,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Atualizar um pacote' })
  @ApiParam({ name: 'id', description: 'ID do pacote' })
  @ApiResponse({ 
    status: 200, 
    description: 'Pacote atualizado com sucesso',
    type: PacoteResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Pacote não encontrado'
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePacoteDto: UpdatePacoteDto) {
    try {
      const pacote = await this.pacoteService.update(Number(id), updatePacoteDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Pacote atualizado com sucesso',
        data: pacote,
      };
    } catch (error) {
      this.logger.error(`Erro ao atualizar pacote: ${error.message}`, error.stack);
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao atualizar pacote: ${error.message}`,
        error: error.name,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Remover um pacote' })
  @ApiParam({ name: 'id', description: 'ID do pacote' })
  @ApiResponse({ 
    status: 200, 
    description: 'Pacote removido com sucesso'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Pacote não encontrado'
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.pacoteService.remove(Number(id));
      return {
        statusCode: HttpStatus.OK,
        message: 'Pacote removido com sucesso',
      };
    } catch (error) {
      this.logger.error(`Erro ao remover pacote: ${error.message}`, error.stack);
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao remover pacote: ${error.message}`,
        error: error.name,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 