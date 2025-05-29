import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioController } from './funcionario.controller';
import { Funcionario } from '../../database/entities/funcionario.entity';
import { Usuario } from '../../database/entities/usuario.entity';
import { ClienteModule } from '../cliente/cliente.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Funcionario, Usuario]),
    ClienteModule
  ],
  controllers: [FuncionarioController],
  providers: [FuncionarioService],
  exports: [FuncionarioService],
})
export class FuncionarioModule {}