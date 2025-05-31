import { PacoteRepository } from '../../../domain/repositories/pacote.repository.interface';
import { Pacote } from '../../../domain/models/pacote.model';

export class CreatePacoteUseCase {
  constructor(private readonly pacoteRepository: PacoteRepository) {}

  async execute(data: Pacote): Promise<Pacote> {
    return this.pacoteRepository.create(data);
  }
} 