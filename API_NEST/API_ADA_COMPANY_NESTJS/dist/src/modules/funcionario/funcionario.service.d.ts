import { Funcionario } from '../../database/models/funcionario.model';
export declare class FuncionarioService {
    private funcionarioModel;
    private readonly logger;
    constructor(funcionarioModel: typeof Funcionario);
    findAll(): Promise<Funcionario[]>;
    findOne(id: string): Promise<Funcionario>;
    findByEmail(email: string): Promise<Funcionario>;
    findByEmailWithoutException(email: string): Promise<Funcionario | null>;
    create(funcionarioData: Partial<Funcionario>): Promise<Funcionario>;
    update(id: string, funcionarioData: Partial<Funcionario>): Promise<Funcionario>;
    remove(id: string): Promise<void>;
}
