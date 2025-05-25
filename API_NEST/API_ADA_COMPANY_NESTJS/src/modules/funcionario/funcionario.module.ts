import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioController } from './funcionario.controller';
import { Funcionario } from '../../database/entities/funcionario.entity';
import { Usuario } from '../../database/entities/usuario.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Funcionario, Usuario]),
  ],
  controllers: [FuncionarioController],
  providers: [FuncionarioService],
  exports: [FuncionarioService],
})
export class FuncionarioModule {}