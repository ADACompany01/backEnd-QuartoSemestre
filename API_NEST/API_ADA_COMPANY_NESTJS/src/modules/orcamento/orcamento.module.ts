import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Orcamento } from '../../database/models/orcamento.model';
import { OrcamentoRepository } from '../../database/repositories/orcamento.repository';
import { OrcamentoController } from './orcamento.controller';
import { OrcamentoService } from './orcamento.service';
import { ClienteModule } from '../cliente/cliente.module';
import { ServicoModule } from '../servico/servico.module';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([Orcamento]),
    ClienteModule,
    ServicoModule,
  ],
  controllers: [OrcamentoController],
  providers: [
    OrcamentoService,
    OrcamentoRepository
  ],
  exports: [OrcamentoRepository]
})
export class OrcamentoModule {}