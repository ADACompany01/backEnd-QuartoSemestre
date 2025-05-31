import { Pacote } from '../models/pacote.model';

export interface PacoteRepository {
  create(pacote: Pacote): Promise<Pacote>;
  findAll(): Promise<Pacote[]>;
  findById(id: string): Promise<Pacote | null>;
  update(id: string, data: Partial<Pacote>): Promise<[number, Pacote[]]>;
  delete(id: string): Promise<number>;
  // Adicione outros métodos conforme necessário
} 