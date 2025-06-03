import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contrato } from '../../infrastructure/database/entities/contrato.entity';
import { Cliente } from '../../infrastructure/database/entities/cliente.entity';
import { Orcamento } from '../../infrastructure/database/entities/orcamento.entity';
import { ContratoController } from '../../interfaces/http/controllers/contrato.controller';
import { FuncionarioModule } from '../funcionario/funcionario.module';
import { ContratoRepositoryProvider, CONTRATO_REPOSITORY } from '../../infrastructure/providers/contrato.provider';
import { CreateContratoUseCase } from '../../application/use-cases/contrato/create-contrato.use-case';
import { ListContratosUseCase } from '../../application/use-cases/contrato/list-contratos.use-case';
import { GetContratoUseCase } from '../../application/use-cases/contrato/get-contrato.use-case';
import { UpdateContratoUseCase } from '../../application/use-cases/contrato/update-contrato.use-case';
import { DeleteContratoUseCase } from '../../application/use-cases/contrato/delete-contrato.use-case';
import { OrcamentoService } from '../../application/use-cases/orcamento/orcamento.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Contrato, Cliente, Orcamento]),
    FuncionarioModule,
  ],
  controllers: [ContratoController],
  providers: [
    ContratoRepositoryProvider,
    {
      provide: CreateContratoUseCase,
      useFactory: (contratoRepo, orcamentoService) => new CreateContratoUseCase(contratoRepo, orcamentoService),
      inject: [CONTRATO_REPOSITORY, OrcamentoService],
    },
    {
      provide: ListContratosUseCase,
      useFactory: (repo) => new ListContratosUseCase(repo),
      inject: [CONTRATO_REPOSITORY],
    },
    {
      provide: GetContratoUseCase,
      useFactory: (repo) => new GetContratoUseCase(repo),
      inject: [CONTRATO_REPOSITORY],
    },
    {
      provide: UpdateContratoUseCase,
      useFactory: (repo) => new UpdateContratoUseCase(repo),
      inject: [CONTRATO_REPOSITORY],
    },
    {
      provide: DeleteContratoUseCase,
      useFactory: (repo) => new DeleteContratoUseCase(repo),
      inject: [CONTRATO_REPOSITORY],
    },
    OrcamentoService,
  ],
  exports: [
    CreateContratoUseCase,
    ListContratosUseCase,
    GetContratoUseCase,
    UpdateContratoUseCase,
    DeleteContratoUseCase,
    CONTRATO_REPOSITORY,
    OrcamentoService,
  ]
})
export class ContratoModule {} 