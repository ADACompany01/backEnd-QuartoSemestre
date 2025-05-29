import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, Logger, HttpException, UseGuards } from '@nestjs/common';
import { PacoteService } from './pacote.service';
import { CreatePacoteDto } from './dto/create-pacote.dto';
import { UpdatePacoteDto } from './dto/update-pacote.dto';
import { PacoteResponseDto } from '../../shared/dto/common-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { FuncionarioGuard } from '../auth/guards/funcionario.guard';

@ApiTags('pacotes')
@ApiBearerAuth()
@Controller('pacotes')
@UseGuards(FuncionarioGuard)
export class PacoteController {
  private readonly logger = new Logger(PacoteController.name);

  constructor(private readonly pacoteService: PacoteService) {}

  @Post()
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
  @ApiResponse({ 
    status: 401, 
    description: 'Não autorizado'
  })
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

  @Get()
  @ApiOperation({ summary: 'Listar todos os pacotes' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de pacotes retornada com sucesso',
    type: PacoteResponseDto,
    isArray: true
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Não autorizado'
  })
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

  @Get(':id')
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
  @ApiResponse({ 
    status: 401, 
    description: 'Não autorizado'
  })
  async findOne(@Param('id') id: string) {
    const pacote = await this.pacoteService.findOne(id);
    return pacote;
  }

  @Put(':id')
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
  @ApiResponse({ 
    status: 401, 
    description: 'Não autorizado'
  })
  async update(
    @Param('id') id: string,
    @Body() updatePacoteDto: UpdatePacoteDto,
  ) {
    const pacote = await this.pacoteService.update(id, updatePacoteDto);
    return pacote;
  }

  @Delete(':id')
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
  @ApiResponse({ 
    status: 401, 
    description: 'Não autorizado'
  })
  async remove(@Param('id') id: string) {
    await this.pacoteService.remove(id);
    return { message: 'Pacote removido com sucesso' };
  }
} 