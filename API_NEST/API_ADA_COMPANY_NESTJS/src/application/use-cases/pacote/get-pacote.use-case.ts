import { PacoteRepository } from '../../../domain/repositories/pacote.repository.interface';
import { Pacote } from '../../../domain/models/pacote.model';

export class GetPacoteUseCase {
  constructor(private readonly pacoteRepository: PacoteRepository) {}

  async execute(id: string): Promise<Pacote | null> {
    return this.pacoteRepository.findById(id);
  }
} 