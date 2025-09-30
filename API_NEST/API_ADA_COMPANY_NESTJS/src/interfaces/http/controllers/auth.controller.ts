import { Controller, Get, Post, Body, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { AuthService } from '../../../application/auth/auth.service';
import { Public } from '../decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthResponseDto } from '../dtos/responses/auth-response.dto';
import { LoggingService } from '../../../application/services/logging.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('LoggingService')
    private readonly loggingService: LoggingService,
  ) {}

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

  @ApiOperation({ summary: 'Login de usuário (cliente ou funcionário)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'usuario@email.com' },
        senha: { type: 'string', example: 'senha123' }
      },
      required: ['email', 'senha']
    },
    description: 'Credenciais do usuário (cliente ou funcionário)'
  })
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
  @Post('login')
  @HttpCode(200)
  async login(@Body() body: { email: string; senha: string }) {
    try {
      const result = await this.authService.login(body);
      
      // Log de login bem-sucedido
      await this.loggingService.info(
        `Login realizado com sucesso para o email: ${body.email}`,
        'AuthController',
        { email: body.email, userId: result.user?.id }
      );
      
      return result;
    } catch (error) {
      // Log de tentativa de login falhada
      await this.loggingService.warn(
        `Tentativa de login falhada para o email: ${body.email}`,
        'AuthController',
        { email: body.email, error: error.message }
      );
      
      throw error;
    }
  }
} 