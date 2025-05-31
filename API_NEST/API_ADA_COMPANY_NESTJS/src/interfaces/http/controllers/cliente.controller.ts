import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, Logger, HttpException, UseGuards } from '@nestjs/common';
import { Public } from '../../../modules/auth/decorators/public.decorator';
import { CreateClienteDto } from '../dtos/requests/create-cliente.dto';
import { UpdateClienteDto } from '../dtos/requests/update-cliente.dto';
import { ClienteResponseDto } from '../dtos/responses/cliente-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { SelfAccessGuard } from '../../../modules/auth/guards/self-access.guard';
import { FuncionarioGuard } from '../../../modules/auth/guards/funcionario.guard';
import { CreateClienteUseCase } from '../../../application/use-cases/cliente/create-cliente.use-case';
import { ListClientesUseCase } from '../../../application/use-cases/cliente/list-clientes.use-case';
import { GetClienteUseCase } from '../../../application/use-cases/cliente/get-cliente.use-case';
import { UpdateClienteUseCase } from '../../../application/use-cases/cliente/update-cliente.use-case';
import { DeleteClienteUseCase } from '../../../application/use-cases/cliente/delete-cliente.use-case';
import { Cliente } from '../../../domain/models/cliente.model';
import { UsuarioRepository } from '../../../infrastructure/database/repositories/usuario.repository';
import { Usuario } from '../../../domain/models/usuario.model';

@ApiTags('clientes')
@ApiBearerAuth()
@Controller('clientes')
export class ClienteController {
  private readonly logger = new Logger(ClienteController.name);
  
  constructor(
    private readonly createClienteUseCase: CreateClienteUseCase,
    private readonly listClientesUseCase: ListClientesUseCase,
    private readonly getClienteUseCase: GetClienteUseCase,
    private readonly updateClienteUseCase: UpdateClienteUseCase,
    private readonly deleteClienteUseCase: DeleteClienteUseCase,
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

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
      // Cria o usuário primeiro
      const usuario: Partial<Usuario> = {
        nome_completo: createClienteDto.nome_completo,
        telefone: createClienteDto.telefone,
        email: createClienteDto.email,
        senha: createClienteDto.senha,
      };
      const usuarioCriado = await this.usuarioRepository.create(usuario);
      const id_usuario = usuarioCriado.id_usuario;
      // Cria o cliente
      const clienteModel = toClienteModelFromCreateDto(createClienteDto, id_usuario);
      const cliente = await this.createClienteUseCase.execute(clienteModel);
      return toClienteResponseDto(cliente);
    } catch (error) {
      this.logger.error(`Erro ao cadastrar cliente: ${error.message}`, error.stack);
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao cadastrar cliente: ${error.message}`,
        error: error.name,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(@Body() clienteDto: Cliente) {
    return this.createClienteUseCase.execute(clienteDto);
  }

  @UseGuards(FuncionarioGuard)
  @Get()
  @ApiOperation({ summary: 'Listar todos os clientes (apenas funcionários)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de clientes retornada com sucesso',
    type: ClienteResponseDto,
    isArray: true
  })
  async findAll() {
    const clientes = await this.listClientesUseCase.execute();
    return {
      statusCode: HttpStatus.OK,
      message: 'Clientes encontrados com sucesso',
      data: toClienteResponseDtoList(clientes),
    };
  }

  @UseGuards(FuncionarioGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Buscar cliente por ID (apenas funcionários)' })
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
  async findOne(@Param('id') id: string) {
    const cliente = await this.getClienteUseCase.execute(id);
    if (!cliente) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Cliente não encontrado',
      }, HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Cliente encontrado com sucesso',
      data: toClienteResponseDto(cliente),
    };
  }

  @UseGuards(SelfAccessGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar dados do cliente (cliente próprio ou funcionário)' })
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
  async update(
    @Param('id') id: string,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    try {
      // Aqui você pode buscar o cliente para obter o id_usuario, se necessário
      const cliente = await this.getClienteUseCase.execute(id);
      if (!cliente) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Cliente não encontrado',
        }, HttpStatus.NOT_FOUND);
      }
      const clienteModel = toClienteModelFromUpdateDto(updateClienteDto, id, cliente.id_usuario);
      const [affectedCount, affectedRows] = await this.updateClienteUseCase.execute(id, clienteModel);
      if (affectedCount === 0) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Cliente não encontrado',
        }, HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Cliente atualizado com sucesso',
        data: toClienteResponseDtoList(affectedRows),
      };
    } catch (error) {
      this.logger.error(`Erro ao atualizar cliente: ${error.message}`, error.stack);
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao atualizar cliente: ${error.message}`,
        error: error.name,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(FuncionarioGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Remover um cliente (apenas funcionários)' })
  @ApiParam({ name: 'id', description: 'ID do cliente' })
  @ApiResponse({ 
    status: 200, 
    description: 'Cliente removido com sucesso'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Cliente não encontrado'
  })
  async remove(@Param('id') id: string) {
    try {
      const deleted = await this.deleteClienteUseCase.execute(id);
      if (deleted === 0) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Cliente não encontrado',
        }, HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Cliente removido com sucesso',
      };
    } catch (error) {
      this.logger.error(`Erro ao remover cliente: ${error.message}`, error.stack);
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao remover cliente: ${error.message}`,
        error: error.name,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

function toClienteModelFromCreateDto(dto: CreateClienteDto, id_usuario: string): Cliente {
  return {
    id_cliente: '', // será gerado pelo banco
    nome_completo: dto.nome_completo,
    cnpj: dto.cnpj,
    telefone: dto.telefone,
    email: dto.email,
    id_usuario,
  };
}

function toClienteModelFromUpdateDto(dto: UpdateClienteDto, id_cliente: string, id_usuario: string): Cliente {
  return {
    id_cliente,
    nome_completo: dto.nome_completo ?? '',
    cnpj: dto.cnpj ?? '',
    telefone: dto.telefone ?? '',
    email: dto.email ?? '',
    id_usuario,
  };
}

function toClienteResponseDto(cliente: Cliente): ClienteResponseDto {
  return {
    id_cliente: cliente.id_cliente,
    nome_completo: cliente.nome_completo,
    cnpj: cliente.cnpj,
    telefone: cliente.telefone,
    email: cliente.email,
    id_usuario: cliente.id_usuario,
  };
}

function toClienteResponseDtoList(clientes: Cliente[]): ClienteResponseDto[] {
  return clientes.map(toClienteResponseDto);
}