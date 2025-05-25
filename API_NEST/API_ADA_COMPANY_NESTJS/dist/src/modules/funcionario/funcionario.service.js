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
var FuncionarioService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncionarioService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const funcionario_entity_1 = require("../../database/entities/funcionario.entity");
const usuario_entity_1 = require("../../database/entities/usuario.entity");
const bcrypt = __importStar(require("bcrypt"));
let FuncionarioService = FuncionarioService_1 = class FuncionarioService {
    constructor(funcionarioModel, usuarioModel) {
        this.funcionarioModel = funcionarioModel;
        this.usuarioModel = usuarioModel;
        this.logger = new common_1.Logger(FuncionarioService_1.name);
    }
    async create(createFuncionarioDto) {
        const usuarioExistente = await this.usuarioModel.findOne({ where: { email: createFuncionarioDto.email } });
        if (usuarioExistente) {
            throw new common_1.ConflictException('Já existe um usuário com este email');
        }
        const senhaHash = await bcrypt.hash(createFuncionarioDto.senha, 10);
        const usuario = await this.usuarioModel.create({
            nome_completo: createFuncionarioDto.nome_completo,
            email: createFuncionarioDto.email,
            telefone: createFuncionarioDto.telefone,
            senha: senhaHash,
        });
        return this.funcionarioModel.create({
            nome_completo: createFuncionarioDto.nome_completo,
            email: createFuncionarioDto.email,
            telefone: createFuncionarioDto.telefone,
            id_usuario: usuario.id_usuario,
        });
    }
    async findAll() {
        return this.funcionarioModel.findAll({
            include: [usuario_entity_1.Usuario],
        });
    }
    async findOne(id) {
        const funcionario = await this.funcionarioModel.findByPk(id, {
            include: [usuario_entity_1.Usuario],
        });
        if (!funcionario) {
            throw new common_1.NotFoundException('Funcionário não encontrado');
        }
        return funcionario;
    }
    async findByEmail(email) {
        const funcionario = await this.funcionarioModel.findOne({
            where: { email },
            include: [usuario_entity_1.Usuario],
        });
        if (!funcionario) {
            throw new common_1.NotFoundException('Funcionário não encontrado');
        }
        return funcionario;
    }
    async findByEmailWithoutException(email) {
        return this.funcionarioModel.findOne({
            where: { email },
            include: [usuario_entity_1.Usuario],
        });
    }
    async update(id, updateFuncionarioDto) {
        const funcionario = await this.findOne(id);
        if (updateFuncionarioDto.id_usuario) {
            const usuario = await this.usuarioModel.findByPk(updateFuncionarioDto.id_usuario);
            if (!usuario) {
                throw new common_1.NotFoundException('Usuário não encontrado');
            }
        }
        await funcionario.update(updateFuncionarioDto);
        return this.findOne(id);
    }
    async remove(id) {
        const funcionario = await this.findOne(id);
        await funcionario.destroy();
    }
};
exports.FuncionarioService = FuncionarioService;
exports.FuncionarioService = FuncionarioService = FuncionarioService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(funcionario_entity_1.Funcionario)),
    __param(1, (0, sequelize_1.InjectModel)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [Object, Object])
], FuncionarioService);
//# sourceMappingURL=funcionario.service.js.map