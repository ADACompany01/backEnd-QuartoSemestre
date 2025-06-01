import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../../../application/auth/auth.service';
import { FuncionarioLoginDto } from '../dtos/requests/funcionario-login.dto';
import { ClienteLoginDto } from '../dtos/requests/cliente-login.dto';
import { Public } from '../decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthResponseDto } from '../dtos/responses/auth-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Gerar token para teste' })
  @ApiResponse({ 
    status: 200, 
    description: 'Token gerado com sucesso',
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
      }
    }
  })
  @Public()
  @Get('token')
  getToken(): { token: string } {
    const token = this.authService.gerarTokenValido();
    return { token };
  }

  @ApiOperation({ summary: 'Login de funcionário' })
  @ApiResponse({ 
    status: 200, 
    description: 'Login realizado com sucesso',
    type: AuthResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Credenciais inválidas'
  })
  @Public()
  @Post('login/funcionario')
  @HttpCode(200)
  async loginFuncionario(@Body() loginDto: FuncionarioLoginDto) {
    return this.authService.loginFuncionario(loginDto);
  }

  @ApiOperation({ summary: 'Login de cliente' })
  @ApiResponse({ 
    status: 200, 
    description: 'Login realizado com sucesso',
    type: AuthResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Credenciais inválidas'
  })
  @Public()
  @Post('login/cliente')
  @HttpCode(200)
  async loginCliente(@Body() loginDto: ClienteLoginDto) {
    return this.authService.loginCliente(loginDto);
  }
} 