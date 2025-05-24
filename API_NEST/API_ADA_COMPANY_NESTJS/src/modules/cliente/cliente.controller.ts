import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, Logger, HttpException } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Public } from '../auth/decorators/public.decorator';
import * as bcrypt from 'bcrypt';
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
      data: clientes.map(cliente => cliente.toJSON()),
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
      data: cliente.toJSON(),
    };
  }

  @ApiOperation({ summary: 'Criar um novo cliente' })
  @ApiResponse({ 
    status: 201, 
    description: 'Cliente criado com sucesso',
    type: ClienteResponseDto
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
  async create(@Body() createClienteDto: CreateClienteDto) {
    try {
      this.logger.log(`Tentando criar cliente: ${JSON.stringify(createClienteDto)}`);
      
      // Criptografar senha se fornecida
      if (createClienteDto.senha) {
        const salt = await bcrypt.genSalt();
        createClienteDto.senha = await bcrypt.hash(createClienteDto.senha, salt);
      }
      
      // Verificar se já existe um cliente com o mesmo email
      const clienteExistente = await this.clienteService.findByEmailWithoutException(createClienteDto.email);
      if (clienteExistente) {
        throw new HttpException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Já existe um cliente com este email',
          error: 'Bad Request',
        }, HttpStatus.BAD_REQUEST);
      }
      
      const cliente = await this.clienteService.create(createClienteDto);
      
      // Remover a senha da resposta
      const clienteJSON = cliente.toJSON();
      delete clienteJSON.senha;
      
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Cliente criado com sucesso',
        data: clienteJSON,
      };
    } catch (error) {
      this.logger.error(`Erro ao criar cliente: ${error.message}`, error.stack);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao criar cliente: ${error.message}`,
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
      // Criptografar senha se fornecida
      if (updateClienteDto.senha) {
        const salt = await bcrypt.genSalt();
        updateClienteDto.senha = await bcrypt.hash(updateClienteDto.senha, salt);
      }
      
      const clienteAtualizado = await this.clienteService.update(id, updateClienteDto);
      
      // Remover a senha da resposta
      const clienteJSON = clienteAtualizado.toJSON();
      delete clienteJSON.senha;
      
      return {
        statusCode: HttpStatus.OK,
        message: 'Cliente atualizado com sucesso',
        data: clienteJSON,
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