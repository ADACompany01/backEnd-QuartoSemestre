import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AuthModule } from './application/auth/auth.module';
import { ClienteModule } from './modules/cliente.module';
import { FuncionarioModule } from './modules/funcionario.module';
import { OrcamentoModule } from './modules/orcamento.module';
import { ContratoModule } from './modules/contrato.module';
import { JwtAuthGuard } from './interfaces/http/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'ada_company_secret_key_2025',
        signOptions: { expiresIn: '1h' },
      }),
      global: true,
    }),
    DatabaseModule,
    AuthModule,
    ClienteModule,
    FuncionarioModule,
    OrcamentoModule,
    ContratoModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
