import { Funcionario } from '../../database/entities/funcionario.entity';
import { Usuario } from '../../database/entities/usuario.entity';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
export declare class FuncionarioService {
    private funcionarioModel;
    private usuarioModel;
    private readonly logger;
    constructor(funcionarioModel: typeof Funcionario, usuarioModel: typeof Usuario);
    create(createFuncionarioDto: CreateFuncionarioDto): Promise<Funcionario>;
    findAll(): Promise<Funcionario[]>;
    findOne(id: string): Promise<Funcionario>;
    findByEmail(email: string): Promise<Funcionario>;
    findByEmailWithoutException(email: string): Promise<Funcionario | null>;
    update(id: string, updateFuncionarioDto: UpdateFuncionarioDto): Promise<Funcionario>;
    remove(id: string): Promise<void>;
}
