import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cliente } from './models/cliente.model';
import { Funcionario } from './models/funcionario.model';
import { Servico } from './models/servico.model';
import { Orcamento } from './models/orcamento.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './database.sqlite',
      autoLoadModels: true,
      synchronize: true,
      models: [Cliente, Funcionario, Servico, Orcamento],
    }),
    SequelizeModule.forFeature([
      Cliente,
      Funcionario,
      Servico,
      Orcamento,
    ]),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
