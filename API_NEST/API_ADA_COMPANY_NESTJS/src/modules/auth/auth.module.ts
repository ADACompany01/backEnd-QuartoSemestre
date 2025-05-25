import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Usuario } from '../../database/entities/usuario.entity';
import { JwtModule } from '@nestjs/jwt';
import { FuncionarioModule } from '../funcionario/funcionario.module';
import { ClienteModule } from '../cliente/cliente.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([Usuario]),
    JwtModule.register({
      secret: 'sua_chave_secreta_aqui', // Em produção, use variável de ambiente
      signOptions: { expiresIn: '1d' },
    }),
    FuncionarioModule,
    ClienteModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}