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
var FuncionarioService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncionarioService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const funcionario_model_1 = require("../../database/models/funcionario.model");
let FuncionarioService = FuncionarioService_1 = class FuncionarioService {
    constructor(funcionarioModel) {
        this.funcionarioModel = funcionarioModel;
        this.logger = new common_1.Logger(FuncionarioService_1.name);
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
        const funcionario = await this.funcionarioModel.findOne({ where: { email, ativo: true } });
        if (!funcionario) {
            throw new common_1.NotFoundException(`Funcionário com email ${email} não encontrado`);
        }
        return funcionario;
    }
    async findByEmailWithoutException(email) {
        return this.funcionarioModel.findOne({ where: { email, ativo: true } });
    }
    async create(funcionarioData) {
        try {
            const existingByEmail = await this.funcionarioModel.findOne({
                where: { email: funcionarioData.email }
            });
            if (existingByEmail) {
                throw new common_1.ConflictException(`Funcionário com email ${funcionarioData.email} já existe`);
            }
            if (funcionarioData.cpf) {
                const existingByCpf = await this.funcionarioModel.findOne({
                    where: { cpf: funcionarioData.cpf }
                });
                if (existingByCpf) {
                    throw new common_1.ConflictException(`Funcionário com CPF ${funcionarioData.cpf} já existe`);
                }
            }
            const dataToCreate = {
                ...funcionarioData,
                ativo: funcionarioData.ativo ?? true,
                dataCriacao: funcionarioData.dataCriacao ?? new Date(),
            };
            if (!dataToCreate.cpf || dataToCreate.cpf.trim() === '') {
                dataToCreate.cpf = null;
            }
            const funcionario = await this.funcionarioModel.create(dataToCreate);
            return funcionario;
        }
        catch (error) {
            this.logger.error(`Erro ao criar funcionário: ${error.message}`, error.stack);
            throw error;
        }
    }
    async update(id, funcionarioData) {
        try {
            const funcionario = await this.findOne(id);
            if (funcionarioData.email && funcionarioData.email !== funcionario.email) {
                const existingByEmail = await this.funcionarioModel.findOne({
                    where: { email: funcionarioData.email }
                });
                if (existingByEmail) {
                    throw new common_1.ConflictException(`Funcionário com email ${funcionarioData.email} já existe`);
                }
            }
            if (funcionarioData.cpf && funcionarioData.cpf !== funcionario.cpf) {
                const existingByCpf = await this.funcionarioModel.findOne({
                    where: { cpf: funcionarioData.cpf }
                });
                if (existingByCpf) {
                    throw new common_1.ConflictException(`Funcionário com CPF ${funcionarioData.cpf} já existe`);
                }
            }
            if (funcionarioData.cpf !== undefined && (!funcionarioData.cpf || funcionarioData.cpf.trim() === '')) {
                funcionarioData.cpf = null;
            }
            await funcionario.update(funcionarioData);
            return funcionario.reload();
        }
        catch (error) {
            this.logger.error(`Erro ao atualizar funcionário: ${error.message}`, error.stack);
            throw error;
        }
    }
    async remove(id) {
        const funcionario = await this.findOne(id);
        await funcionario.update({ ativo: false });
    }
};
exports.FuncionarioService = FuncionarioService;
exports.FuncionarioService = FuncionarioService = FuncionarioService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(funcionario_model_1.Funcionario)),
    __metadata("design:paramtypes", [Object])
], FuncionarioService);
//# sourceMappingURL=funcionario.service.js.map