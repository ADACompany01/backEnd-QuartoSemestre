"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncionarioService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const bcrypt = require("bcrypt");
const funcionario_model_1 = require("../../database/models/funcionario.model");
let FuncionarioService = class FuncionarioService {
    constructor(funcionarioModel) {
        this.funcionarioModel = funcionarioModel;
    }
    async findAll() {
        return this.funcionarioModel.findAll({ where: { ativo: true } });
    }
    async findOne(id) {
        const funcionario = await this.funcionarioModel.findOne({ where: { id, ativo: true } });
        if (!funcionario) {
            throw new common_1.NotFoundException(`Funcionário com ID ${id} não encontrado`);
        }
        return funcionario;
    }
    async findByEmail(email) {
        return this.funcionarioModel.findOne({ where: { email, ativo: true } });
    }
    async create(funcionarioData) {
        const existingFuncionario = await this.funcionarioModel.findOne({ where: { email: funcionarioData.email } });
        if (existingFuncionario) {
            throw new common_1.ConflictException(`Funcionário com email ${funcionarioData.email} já existe`);
        }
        const hashedPassword = await bcrypt.hash(funcionarioData.senha, 10);
        return this.funcionarioModel.create({
            ...funcionarioData,
            senha: hashedPassword,
        });
    }
    async update(id, funcionarioData) {
        const funcionario = await this.findOne(id);
        if (funcionarioData.senha) {
            funcionarioData.senha = await bcrypt.hash(funcionarioData.senha, 10);
        }
        await funcionario.update(funcionarioData);
        return funcionario.reload();
    }
    async remove(id) {
        const funcionario = await this.findOne(id);
        await funcionario.update({ ativo: false });
    }
};
exports.FuncionarioService = FuncionarioService;
exports.FuncionarioService = FuncionarioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(funcionario_model_1.Funcionario)),
    __metadata("design:paramtypes", [Object])
], FuncionarioService);
//# sourceMappingURL=funcionario.service.js.map