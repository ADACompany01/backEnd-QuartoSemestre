import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, Logger, HttpException } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Public } from '../auth/decorators/public.decorator';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClienteResponseDto } from './dto/cliente-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('clientes')
@ApiBearerAuth()
@Controller('clientes')
export class ClienteController {
  private readonly logger = new Logger(ClienteController.name);
  
  constructor(private readonly clienteService: ClienteService) {}

  @ApiOperation({ summary: 'Listar todos os clientes' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de clientes retornada com sucesso',
    type: ClienteResponseDto,
    isArray: true
  })
  @Get()
  async findAll() {
    const clientes = await this.clienteService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Clientes encontrados com sucesso',
      data: clientes,
    };
  }

  @ApiOperation({ summary: 'Buscar cliente por ID' })
  @ApiParam({ name: 'id', description: 'ID do cliente' })
  @ApiResponse({ 
    status: 200, 
    description: 'Cliente encontrado com sucesso',
    type: ClienteResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Cliente não encontrado'
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const cliente = await this.clienteService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Cliente encontrado com sucesso',
      data: cliente,
    };
  }

  @Public()
  @Post('cadastro')
  @ApiOperation({ summary: 'Cadastro de novo cliente' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Cliente cadastrado com sucesso',
    type: ClienteResponseDto 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Dados inválidos fornecidos' 
  })
  @ApiResponse({ 
    status: HttpStatus.CONFLICT, 
    description: 'Email ou CNPJ já cadastrado' 
  })
  async cadastro(@Body() createClienteDto: CreateClienteDto) {
    try {
      const cliente = await this.clienteService.cadastro(createClienteDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Cliente cadastrado com sucesso',
        data: cliente,
      };
    } catch (error) {
      this.logger.error(`Erro ao cadastrar cliente: ${error.message}`, error.stack);
      
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new HttpException({
          statusCode: HttpStatus.CONFLICT,
          message: 'Email ou CNPJ já cadastrado no sistema',
          error: 'Conflict',
        }, HttpStatus.CONFLICT);
      }
      
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao cadastrar cliente: ${error.message}`,
        error: error.name,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Atualizar um cliente' })
  @ApiParam({ name: 'id', description: 'ID do cliente' })
  @ApiResponse({ 
    status: 200, 
    description: 'Cliente atualizado com sucesso',
    type: ClienteResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Cliente não encontrado'
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    try {
      const clienteAtualizado = await this.clienteService.update(id, updateClienteDto);
      
      return {
        statusCode: HttpStatus.OK,
        message: 'Cliente atualizado com sucesso',
        data: clienteAtualizado,
      };
    } catch (error) {
      this.logger.error(`Erro ao atualizar cliente: ${error.message}`, error.stack);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao atualizar cliente: ${error.message}`,
        error: error.name,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Remover um cliente' })
  @ApiParam({ name: 'id', description: 'ID do cliente' })
  @ApiResponse({ 
    status: 200, 
    description: 'Cliente removido com sucesso'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Cliente não encontrado'
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.clienteService.remove(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cliente removido com sucesso',
      };
    } catch (error) {
      this.logger.error(`Erro ao remover cliente: ${error.message}`, error.stack);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao remover cliente: ${error.message}`,
        error: error.name,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}