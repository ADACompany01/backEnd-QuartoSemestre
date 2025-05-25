import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pacote } from '../../database/entities/pacote.entity';
import { PacoteRepository } from '../../database/repositories/pacote.repository';
import { PacoteController } from './pacote.controller';
import { PacoteService } from './pacote.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([Pacote])
  ],
  controllers: [PacoteController],
  providers: [PacoteService, PacoteRepository],
  exports: [PacoteService, PacoteRepository]
})
export class PacoteModule {} 