import { PacoteRepository } from '../../../domain/repositories/pacote.repository.interface';

export class DeletePacoteUseCase {
  constructor(private readonly pacoteRepository: PacoteRepository) {}

  async execute(id: string): Promise<number> {
    return this.pacoteRepository.delete(id);
  }
} 