import { PacoteRepository } from '../../../domain/repositories/pacote.repository.interface';
import { Pacote } from '../../../domain/models/pacote.model';

export class ListPacotesUseCase {
  constructor(private readonly pacoteRepository: PacoteRepository) {}

  async execute(): Promise<Pacote[]> {
    return this.pacoteRepository.findAll();
  }
} 