import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Servico } from '../../database/models/servico.model';
import { ServicoRepository } from '../../database/repositories/servico.repository';
import { ServicoController } from './servico.controller';
import { ServicoService } from './servico.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([Servico])
  ],
  controllers: [ServicoController],
  providers: [
    ServicoService,
    ServicoRepository
  ],
  exports: [ServicoRepository]
})
export class ServicoModule {}