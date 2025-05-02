import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { Funcionario } from '../../database/models/funcionario.model';
import { Public } from '../auth/decorators/public.decorator';

@Controller('funcionarios')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Get()
  async findAll() {
    const funcionarios = await this.funcionarioService.findAll();
    // Remover a senha dos resultados
    const funcionariosSemSenha = funcionarios.map(f => {
      const { senha, ...funcionarioSemSenha } = f.toJSON();
      return funcionarioSemSenha;
    });
    
    return {
      statusCode: HttpStatus.OK,
      message: 'Funcionários encontrados com sucesso',
      data: funcionariosSemSenha,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const funcionario = await this.funcionarioService.findOne(id);
    const { senha, ...funcionarioSemSenha } = funcionario.toJSON();
    
    return {
      statusCode: HttpStatus.OK,
      message: 'Funcionário encontrado com sucesso',
      data: funcionarioSemSenha,
    };
  }

  @Public()
  @Post()
  async create(@Body() funcionarioData: Partial<Funcionario>) {
    const funcionario = await this.funcionarioService.create(funcionarioData);
    const { senha, ...funcionarioSemSenha } = funcionario.toJSON();
    
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Funcionário criado com sucesso',
      data: funcionarioSemSenha,
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() funcionarioData: Partial<Funcionario>) {
    const funcionario = await this.funcionarioService.update(id, funcionarioData);
    const { senha, ...funcionarioSemSenha } = funcionario.toJSON();
    
    return {
      statusCode: HttpStatus.OK,
      message: 'Funcionário atualizado com sucesso',
      data: funcionarioSemSenha,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.funcionarioService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Funcionário removido com sucesso',
    };
  }
}