import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrcamentoController } from './orcamento.controller';
import { OrcamentoService } from './orcamento.service';
import { Orcamento } from '../../database/models/orcamento.model';

@Module({
  imports: [SequelizeModule.forFeature([Orcamento])],
  controllers: [OrcamentoController],
  providers: [OrcamentoService],
  exports: [OrcamentoService],
})
export class OrcamentoModule {}