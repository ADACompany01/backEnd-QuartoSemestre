import { Funcionario } from '../models/funcionario.model';
export declare class FuncionarioRepository {
    private funcionarioModel;
    constructor(funcionarioModel: typeof Funcionario);
    findAll(): Promise<Funcionario[]>;
    findOne(id: string): Promise<Funcionario>;
    create(data: Partial<Funcionario>): Promise<Funcionario>;
    update(id: string, data: Partial<Funcionario>): Promise<[number, Funcionario[]]>;
    delete(id: string): Promise<number>;
    findByEmail(email: string): Promise<Funcionario>;
    findByCpf(cpf: string): Promise<Funcionario>;
    findByEspecialidade(especialidade: string): Promise<Funcionario[]>;
}
