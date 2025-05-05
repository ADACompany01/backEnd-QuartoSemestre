import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cliente } from '../../database/models/cliente.model';
import { ClienteRepository } from '../../database/repositories/cliente.repository';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Cliente]),
  ],
  controllers: [ClientesController],
  providers: [
    ClientesService,
    ClienteRepository,
  ],
  exports: [ClienteRepository],
})
export class ClientesModule {} 