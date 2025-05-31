import { PacoteRepository } from '../../../domain/repositories/pacote.repository.interface';
import { Pacote } from '../../../domain/models/pacote.model';

export class UpdatePacoteUseCase {
  constructor(private readonly pacoteRepository: PacoteRepository) {}

  async execute(id: string, data: Partial<Pacote>): Promise<[number, Pacote[]]> {
    return this.pacoteRepository.update(id, data);
  }
} 