import { Funcionario } from '../models/funcionario.model';

export interface FuncionarioRepository {
  create(funcionario: Funcionario): Promise<Funcionario>;
  findAll(): Promise<Funcionario[]>;
  findById(id: string): Promise<Funcionario | null>;
  update(id: string, data: Partial<Funcionario>): Promise<[number, Funcionario[]]>;
  delete(id: string): Promise<number>;
  // Adicione outros métodos conforme necessário
} 