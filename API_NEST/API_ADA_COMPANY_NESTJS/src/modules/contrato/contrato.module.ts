import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContratoService } from './contrato.service';
import { ContratoController } from './contrato.controller';
import { Contrato } from '../../database/entities/contrato.entity';
import { Cliente } from '../../database/entities/cliente.entity';
import { Orcamento } from '../../database/entities/orcamento.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Contrato, Cliente, Orcamento])
  ],
  controllers: [ContratoController],
  providers: [ContratoService],
  exports: [ContratoService]
})
export class ContratoModule {} 