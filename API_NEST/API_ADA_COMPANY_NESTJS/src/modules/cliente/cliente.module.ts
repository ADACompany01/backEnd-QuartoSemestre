import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cliente } from '../../database/models/cliente.model';
import { ClienteRepository } from '../../database/repositories/cliente.repository';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([Cliente])
  ],
  controllers: [ClienteController],
  providers: [
    ClienteService,
    ClienteRepository
  ],
  exports: [ClienteRepository, ClienteService]
})
export class ClienteModule {}
