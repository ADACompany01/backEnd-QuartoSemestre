import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cliente } from './models/cliente.model';
import { Funcionario } from './models/funcionario.model';
import { Orcamento } from './models/orcamento.model';
import { Servico } from './models/servico.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'database.sqlite',
      autoLoadModels: true,
      synchronize: true,
      models: [Cliente, Funcionario, Orcamento, Servico],
    }),
  ],
})
export class DatabaseModule {}
