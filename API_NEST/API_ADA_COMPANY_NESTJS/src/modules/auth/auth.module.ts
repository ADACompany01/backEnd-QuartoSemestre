import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Usuario } from '../../database/entities/usuario.entity';
import { JwtModule } from '@nestjs/jwt';
import { FuncionarioModule } from '../funcionario/funcionario.module';
import { ClienteModule } from '../cliente/cliente.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { FuncionarioGuard } from './guards/funcionario.guard';
import { SelfAccessGuard } from './guards/self-access.guard';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([Usuario]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'sua_chave_secreta',
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
    FuncionarioModule,
    ClienteModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, FuncionarioGuard, SelfAccessGuard],
  exports: [AuthService, JwtStrategy, FuncionarioGuard, SelfAccessGuard],
})
export class AuthModule {}