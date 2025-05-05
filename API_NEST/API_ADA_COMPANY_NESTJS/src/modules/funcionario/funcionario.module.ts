import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Funcionario } from '../../database/models/funcionario.model';
import { FuncionarioRepository } from '../../database/repositories/funcionario.repository';
import { FuncionarioController } from './funcionario.controller';
import { FuncionarioService } from './funcionario.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([Funcionario])
  ],
  controllers: [FuncionarioController],
  providers: [
    FuncionarioService,
    FuncionarioRepository
  ],
  exports: [FuncionarioRepository]
})
export class FuncionarioModule {}