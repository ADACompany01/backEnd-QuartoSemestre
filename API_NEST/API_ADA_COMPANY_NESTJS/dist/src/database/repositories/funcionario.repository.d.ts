import { Funcionario } from '../entities/funcionario.entity';
export declare class FuncionarioRepository {
    private funcionarioModel;
    constructor(funcionarioModel: typeof Funcionario);
    findAll(): Promise<Funcionario[]>;
    findOne(id: number): Promise<Funcionario | null>;
    create(data: Partial<Funcionario>): Promise<Funcionario>;
    update(id: number, data: Partial<Funcionario>): Promise<[number, Funcionario[]]>;
    delete(id: number): Promise<number>;
    findByEmail(email: string): Promise<Funcionario | null>;
}
