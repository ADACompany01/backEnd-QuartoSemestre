import { Funcionario } from '../../database/models/funcionario.model';
export declare class FuncionarioService {
    private funcionarioModel;
    constructor(funcionarioModel: typeof Funcionario);
    findAll(): Promise<Funcionario[]>;
    findOne(id: string): Promise<Funcionario>;
    findByEmail(email: string): Promise<Funcionario>;
    create(funcionarioData: Partial<Funcionario>): Promise<Funcionario>;
    update(id: string, funcionarioData: Partial<Funcionario>): Promise<Funcionario>;
    remove(id: string): Promise<void>;
}
