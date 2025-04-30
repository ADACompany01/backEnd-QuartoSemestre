import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServicoController } from './servico.controller';
import { ServicoService } from './servico.service';
import { Servico } from '../../database/models/servico.model';

@Module({
  imports: [SequelizeModule.forFeature([Servico])],
  controllers: [ServicoController],
  providers: [ServicoService],
  exports: [ServicoService],
})
export class ServicoModule {}