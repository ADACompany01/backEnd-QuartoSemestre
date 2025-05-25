import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cliente } from '../../database/entities/cliente.entity';
import { ClienteRepository } from '../../database/repositories/cliente.repository';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { DatabaseModule } from '../../database/database.module';
import { Usuario } from '../../database/entities/usuario.entity';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([Cliente, Usuario])
  ],
  controllers: [ClienteController],
  providers: [
    ClienteService,
    ClienteRepository
  ],
  exports: [ClienteRepository, ClienteService]
})
export class ClienteModule {}
