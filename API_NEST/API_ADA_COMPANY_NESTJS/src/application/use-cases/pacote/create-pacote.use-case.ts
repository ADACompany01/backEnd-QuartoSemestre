import { Pacote as PacoteModel } from '../../../domain/models/pacote.model';
import { PacoteRepositoryImpl } from '../../../infrastructure/database/repositories/pacote.repository';
import { CreatePacoteDto } from '../../../interfaces/http/dtos/requests/create-pacote.dto';

export class CreatePacoteUseCase {
  constructor(private readonly pacoteRepository: PacoteRepositoryImpl) {}

  async execute(data: CreatePacoteDto): Promise<PacoteModel> {
    return this.pacoteRepository.create(data);
  }
} 