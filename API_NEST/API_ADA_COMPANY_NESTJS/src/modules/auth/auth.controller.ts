import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { FuncionarioLoginDto } from './dto/funcionario-login.dto';
import { ClienteLoginDto } from './dto/cliente-login.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('token')
  getToken(): { token: string } {
    const token = this.authService.gerarTokenValido();
    return { token };
  }

  @Public()
  @Post('login/funcionario')
  @HttpCode(200)
  async loginFuncionario(@Body() loginDto: FuncionarioLoginDto) {
    return this.authService.loginFuncionario(loginDto);
  }

  @Public()
  @Post('login/cliente')
  @HttpCode(200)
  async loginCliente(@Body() loginDto: ClienteLoginDto) {
    return this.authService.loginCliente(loginDto);
  }
}