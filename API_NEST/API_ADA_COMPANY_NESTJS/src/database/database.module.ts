import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cliente } from './entities/cliente.entity';
import { Funcionario } from './entities/funcionario.entity';
import { Pacote } from './entities/pacote.entity';
import { Orcamento } from './entities/orcamento.entity';
import { Contrato } from './entities/contrato.entity';
import { Usuario } from './entities/usuario.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './database.sqlite',
      autoLoadModels: true,
      synchronize: false, // Use false em produção, true só para testes rápidos
      models: [Cliente, Funcionario, Pacote, Orcamento, Contrato, Usuario],
    }),
    SequelizeModule.forFeature([
      Cliente,
      Funcionario,
      Pacote,
      Orcamento,
      Contrato,
      Usuario,
    ]),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}