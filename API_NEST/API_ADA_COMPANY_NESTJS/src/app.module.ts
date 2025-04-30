import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { FuncionarioModule } from './modules/funcionario/funcionario.module';
import { OrcamentoModule } from './modules/orcamento/orcamento.module';
import { ServicoModule } from './modules/servico/servico.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ClienteModule,
    FuncionarioModule,
    OrcamentoModule,
    ServicoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
