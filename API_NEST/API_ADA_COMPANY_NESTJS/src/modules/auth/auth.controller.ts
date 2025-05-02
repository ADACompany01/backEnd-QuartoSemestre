import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from './dto/login.dto';
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
  async loginFuncionario(@Body() loginDto: LoginDto) {
    return this.authService.loginFuncionario(loginDto);
  }
}