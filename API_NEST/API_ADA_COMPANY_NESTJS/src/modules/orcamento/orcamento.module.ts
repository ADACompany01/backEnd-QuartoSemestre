import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Orcamento } from '../../database/entities/orcamento.entity';
import { OrcamentoRepository } from '../../database/repositories/orcamento.repository';
import { OrcamentoController } from './orcamento.controller';
import { OrcamentoService } from './orcamento.service';
import { ClienteModule } from '../cliente/cliente.module';
import { PacoteModule } from '../pacote/pacote.module';
import { DatabaseModule } from '../../database/database.module';
import { FuncionarioModule } from '../funcionario/funcionario.module';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([Orcamento]),
    ClienteModule,
    PacoteModule,
    FuncionarioModule,
  ],
  controllers: [OrcamentoController],
  providers: [
    OrcamentoService,
    OrcamentoRepository
  ],
  exports: [OrcamentoRepository, OrcamentoService]
})
export class OrcamentoModule {}