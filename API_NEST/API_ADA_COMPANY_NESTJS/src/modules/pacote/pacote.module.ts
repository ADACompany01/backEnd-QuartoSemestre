import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pacote } from '../../infrastructure/database/entities/pacote.entity';
import { PacoteController } from '../../interfaces/http/controllers/pacote.controller';
import { PacoteRepositoryProvider, PACOTE_REPOSITORY } from '../../infrastructure/providers/pacote.provider';
import { CreatePacoteUseCase } from '../../application/use-cases/pacote/create-pacote.use-case';
import { ListPacotesUseCase } from '../../application/use-cases/pacote/list-pacotes.use-case';
import { GetPacoteUseCase } from '../../application/use-cases/pacote/get-pacote.use-case';
import { UpdatePacoteUseCase } from '../../application/use-cases/pacote/update-pacote.use-case';
import { DeletePacoteUseCase } from '../../application/use-cases/pacote/delete-pacote.use-case';
import { FuncionarioModule } from '../funcionario/funcionario.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Pacote]),
    FuncionarioModule,
  ],
  controllers: [PacoteController],
  providers: [
    PacoteRepositoryProvider,
    {
      provide: CreatePacoteUseCase,
      useFactory: (repo) => new CreatePacoteUseCase(repo),
      inject: [PACOTE_REPOSITORY],
    },
    {
      provide: ListPacotesUseCase,
      useFactory: (repo) => new ListPacotesUseCase(repo),
      inject: [PACOTE_REPOSITORY],
    },
    {
      provide: GetPacoteUseCase,
      useFactory: (repo) => new GetPacoteUseCase(repo),
      inject: [PACOTE_REPOSITORY],
    },
    {
      provide: UpdatePacoteUseCase,
      useFactory: (repo) => new UpdatePacoteUseCase(repo),
      inject: [PACOTE_REPOSITORY],
    },
    {
      provide: DeletePacoteUseCase,
      useFactory: (repo) => new DeletePacoteUseCase(repo),
      inject: [PACOTE_REPOSITORY],
    },
  ],
  exports: [
    CreatePacoteUseCase,
    ListPacotesUseCase,
    GetPacoteUseCase,
    UpdatePacoteUseCase,
    DeletePacoteUseCase,
    PACOTE_REPOSITORY
  ]
})
export class PacoteModule {} 