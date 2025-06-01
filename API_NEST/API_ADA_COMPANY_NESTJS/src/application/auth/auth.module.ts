import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from '../../interfaces/http/controllers/auth.controller';
import { GetClienteByEmailUseCase } from '../use-cases/cliente/get-cliente-by-email.use-case';
import { FuncionarioModule } from '../../modules/funcionario/funcionario.module';
import { ClienteModule } from '../../modules/cliente/cliente.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../infrastructure/auth/strategies/jwt.strategy';
import { FuncionarioGuard } from '../../interfaces/http/guards/funcionario.guard';
import { SelfAccessGuard } from '../../interfaces/http/guards/self-access.guard';
import { FuncionarioRepositoryProvider } from '../../infrastructure/providers/funcionario.provider';
import { ClienteRepositoryProvider } from '../../infrastructure/providers/cliente.provider';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    FuncionarioModule,
    ClienteModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    FuncionarioGuard,
    SelfAccessGuard,
    GetClienteByEmailUseCase,
    FuncionarioRepositoryProvider,
    ClienteRepositoryProvider,
  ],
  exports: [
    AuthService,
    JwtStrategy,
    FuncionarioGuard,
    SelfAccessGuard,
    GetClienteByEmailUseCase,
    FuncionarioRepositoryProvider,
    ClienteRepositoryProvider,
  ],
})
export class AuthModule {} 