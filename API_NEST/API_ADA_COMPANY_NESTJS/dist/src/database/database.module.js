"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("@nestjs/sequelize");
const cliente_entity_1 = require("./entities/cliente.entity");
const funcionario_entity_1 = require("./entities/funcionario.entity");
const pacote_entity_1 = require("./entities/pacote.entity");
const orcamento_entity_1 = require("./entities/orcamento.entity");
const contrato_entity_1 = require("./entities/contrato.entity");
const usuario_entity_1 = require("./entities/usuario.entity");
const bcrypt = __importStar(require("bcrypt"));
let DatabaseModule = class DatabaseModule {
    constructor(usuarioModel, clienteModel, funcionarioModel, pacoteModel, orcamentoModel, contratoModel) {
        this.usuarioModel = usuarioModel;
        this.clienteModel = clienteModel;
        this.funcionarioModel = funcionarioModel;
        this.pacoteModel = pacoteModel;
        this.orcamentoModel = orcamentoModel;
        this.contratoModel = contratoModel;
    }
    async onModuleInit() {
        try {
            const usuarioCount = await this.usuarioModel.count();
            if (usuarioCount === 0) {
                const hashedPassword = await bcrypt.hash('senha123', 10);
                const usuarios = await this.usuarioModel.bulkCreate([
                    {
                        nome_completo: 'João Silva',
                        telefone: '(11) 99999-9999',
                        email: 'joao.silva@email.com',
                        senha: hashedPassword,
                    },
                    {
                        nome_completo: 'Maria Santos',
                        telefone: '(11) 98888-8888',
                        email: 'maria.santos@email.com',
                        senha: hashedPassword,
                    },
                    {
                        nome_completo: 'Pedro Silva',
                        telefone: '(11) 97777-7777',
                        email: 'pedro.silva@adacompany.com',
                        senha: hashedPassword,
                    },
                    {
                        nome_completo: 'Ana Costa',
                        telefone: '(11) 96666-6666',
                        email: 'ana.costa@adacompany.com',
                        senha: hashedPassword,
                    },
                    {
                        nome_completo: 'Carlos Santos',
                        telefone: '(11) 95555-5555',
                        email: 'carlos.santos@adacompany.com',
                        senha: hashedPassword,
                    }
                ]);
                await this.clienteModel.bulkCreate([
                    {
                        nome_completo: 'João Silva',
                        cnpj: '12.345.678/0001-90',
                        telefone: '(11) 99999-9999',
                        email: 'joao.silva@email.com',
                        id_usuario: usuarios[0].id_usuario,
                    },
                    {
                        nome_completo: 'Maria Santos',
                        cnpj: '98.765.432/0001-10',
                        telefone: '(11) 98888-8888',
                        email: 'maria.santos@email.com',
                        id_usuario: usuarios[1].id_usuario,
                    }
                ]);
                await this.funcionarioModel.bulkCreate([
                    {
                        nome_completo: 'Pedro Silva',
                        email: 'pedro.silva@adacompany.com',
                        telefone: '(11) 97777-7777',
                        id_usuario: usuarios[2].id_usuario,
                    },
                    {
                        nome_completo: 'Ana Costa',
                        email: 'ana.costa@adacompany.com',
                        telefone: '(11) 96666-6666',
                        id_usuario: usuarios[3].id_usuario,
                    },
                    {
                        nome_completo: 'Carlos Santos',
                        email: 'carlos.santos@adacompany.com',
                        telefone: '(11) 95555-5555',
                        id_usuario: usuarios[4].id_usuario,
                    }
                ]);
                console.log('Dados iniciais criados com sucesso!');
            }
        }
        catch (error) {
            console.error('Erro ao inicializar banco de dados:', error);
        }
    }
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'sqlite',
                storage: './database.sqlite',
                autoLoadModels: true,
                synchronize: true,
                logging: console.log,
                define: {
                    timestamps: true,
                    underscored: true,
                },
                models: [usuario_entity_1.Usuario, cliente_entity_1.Cliente, funcionario_entity_1.Funcionario, pacote_entity_1.Pacote, orcamento_entity_1.Orcamento, contrato_entity_1.Contrato],
            }),
            sequelize_1.SequelizeModule.forFeature([
                usuario_entity_1.Usuario,
                cliente_entity_1.Cliente,
                funcionario_entity_1.Funcionario,
                pacote_entity_1.Pacote,
                orcamento_entity_1.Orcamento,
                contrato_entity_1.Contrato,
            ]),
        ],
        exports: [sequelize_1.SequelizeModule],
    }),
    __param(0, (0, sequelize_2.InjectModel)(usuario_entity_1.Usuario)),
    __param(1, (0, sequelize_2.InjectModel)(cliente_entity_1.Cliente)),
    __param(2, (0, sequelize_2.InjectModel)(funcionario_entity_1.Funcionario)),
    __param(3, (0, sequelize_2.InjectModel)(pacote_entity_1.Pacote)),
    __param(4, (0, sequelize_2.InjectModel)(orcamento_entity_1.Orcamento)),
    __param(5, (0, sequelize_2.InjectModel)(contrato_entity_1.Contrato)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], DatabaseModule);
//# sourceMappingURL=database.module.js.map