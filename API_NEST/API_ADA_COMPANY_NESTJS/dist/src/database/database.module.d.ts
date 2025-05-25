import { OnModuleInit } from '@nestjs/common';
import { Cliente } from './entities/cliente.entity';
import { Funcionario } from './entities/funcionario.entity';
import { Pacote } from './entities/pacote.entity';
import { Orcamento } from './entities/orcamento.entity';
import { Contrato } from './entities/contrato.entity';
import { Usuario } from './entities/usuario.entity';
export declare class DatabaseModule implements OnModuleInit {
    private usuarioModel;
    private clienteModel;
    private funcionarioModel;
    private pacoteModel;
    private orcamentoModel;
    private contratoModel;
    constructor(usuarioModel: typeof Usuario, clienteModel: typeof Cliente, funcionarioModel: typeof Funcionario, pacoteModel: typeof Pacote, orcamentoModel: typeof Orcamento, contratoModel: typeof Contrato);
    onModuleInit(): Promise<void>;
}
