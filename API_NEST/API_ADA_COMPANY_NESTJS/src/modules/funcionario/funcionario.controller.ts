import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { Public } from '../auth/decorators/public.decorator';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { FuncionarioResponseDto } from './dto/funcionario-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('funcionarios')
@ApiBearerAuth()
@Controller('funcionarios')
export class FuncionarioController {
  private readonly logger = new Logger(FuncionarioController.name);
  
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @ApiOperation({ summary: 'Listar todos os funcionários' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de funcionários retornada com sucesso',
    type: FuncionarioResponseDto,
    isArray: true
  })
  @Get()
  async findAll() {
    const funcionarios = await this.funcionarioService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Funcionários encontrados com sucesso',
      data: funcionarios.map(f => f.toJSON()),
    };
  }

  @ApiOperation({ summary: 'Buscar funcionário por ID' })
  @ApiParam({ name: 'id', description: 'ID do funcionário' })
  @ApiResponse({ 
    status: 200, 
    description: 'Funcionário encontrado com sucesso',
    type: FuncionarioResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Funcionário não encontrado'
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const funcionario = await this.funcionarioService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Funcionário encontrado com sucesso',
      data: funcionario.toJSON(),
    };
  }

  @ApiOperation({ summary: 'Criar um novo funcionário' })
  @ApiResponse({ 
    status: 201, 
    description: 'Funcionário criado com sucesso',
    type: FuncionarioResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos'
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Erro interno do servidor'
  })
  @Public()
  @Post()
  async create(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    try {
      this.logger.log(`Tentando criar funcionário: ${JSON.stringify(createFuncionarioDto)}`);
      
      // Verificar se já existe um funcionário com o mesmo email
      const funcionarioExistente = await this.funcionarioService.findByEmailWithoutException(createFuncionarioDto.email);
      if (funcionarioExistente) {
        throw new HttpException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Já existe um funcionário com este email',
          error: 'Bad Request',
        }, HttpStatus.BAD_REQUEST);
      }
      
      // Criar o funcionário
      const funcionario = await this.funcionarioService.create(createFuncionarioDto);
      
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Funcionário criado com sucesso',
        data: funcionario.toJSON(),
      };
    } catch (error) {
      this.logger.error(`Erro ao criar funcionário: ${error.message}`, error.stack);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao criar funcionário: ${error.message}`,
        error: error.name,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Atualizar um funcionário' })
  @ApiParam({ name: 'id', description: 'ID do funcionário' })
  @ApiResponse({ 
    status: 200, 
    description: 'Funcionário atualizado com sucesso',
    type: FuncionarioResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Funcionário não encontrado'
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFuncionarioDto: UpdateFuncionarioDto) {
    try {
      const funcionario = await this.funcionarioService.update(+id, updateFuncionarioDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Funcionário atualizado com sucesso',
        data: funcionario.toJSON(),
      };
    } catch (error) {
      this.logger.error(`Erro ao atualizar funcionário: ${error.message}`, error.stack);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao atualizar funcionário: ${error.message}`,
        error: error.name,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Remover um funcionário' })
  @ApiParam({ name: 'id', description: 'ID do funcionário' })
  @ApiResponse({ 
    status: 200, 
    description: 'Funcionário removido com sucesso'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Funcionário não encontrado'
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.funcionarioService.remove(+id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Funcionário removido com sucesso',
      };
    } catch (error) {
      this.logger.error(`Erro ao remover funcionário: ${error.message}`, error.stack);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao remover funcionário: ${error.message}`,
        error: error.name,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}