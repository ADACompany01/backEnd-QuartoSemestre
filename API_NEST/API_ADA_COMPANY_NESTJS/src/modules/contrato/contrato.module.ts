import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContratoService } from './contrato.service';
import { ContratoController } from './contrato.controller';
import { Contrato } from '../../database/entities/contrato.entity';
import { Cliente } from '../../database/entities/cliente.entity';
import { Orcamento } from '../../database/entities/orcamento.entity';
import { FuncionarioModule } from '../funcionario/funcionario.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Contrato, Cliente, Orcamento]),
    FuncionarioModule,
  ],
  controllers: [ContratoController],
  providers: [ContratoService],
  exports: [ContratoService]
})
export class ContratoModule {} 