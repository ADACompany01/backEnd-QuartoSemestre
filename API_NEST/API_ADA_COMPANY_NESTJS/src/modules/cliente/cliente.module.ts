import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cliente } from '../../database/entities/cliente.entity';
import { ClienteRepository } from '../../database/repositories/cliente.repository';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { DatabaseModule } from '../../database/database.module';
import { Usuario } from '../../database/entities/usuario.entity';
import { UsuarioRepository } from '../../database/repositories/usuario.repository';
import { FuncionarioModule } from '../funcionario/funcionario.module';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([Cliente, Usuario]),
    forwardRef(() => FuncionarioModule)
  ],
  controllers: [ClienteController],
  providers: [
    ClienteService,
    ClienteRepository,
    UsuarioRepository
  ],
  exports: [ClienteRepository, ClienteService]
})
export class ClienteModule {}
