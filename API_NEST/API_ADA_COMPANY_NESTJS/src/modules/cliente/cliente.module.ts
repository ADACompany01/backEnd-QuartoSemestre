import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cliente } from '../../database/models/cliente.model';

@Module({
  imports: [SequelizeModule.forFeature([Cliente])],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
