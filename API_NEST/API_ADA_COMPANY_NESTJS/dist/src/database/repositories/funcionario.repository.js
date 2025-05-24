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
exports.FuncionarioRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const funcionario_model_1 = require("../models/funcionario.model");
let FuncionarioRepository = class FuncionarioRepository {
    constructor(funcionarioModel) {
        this.funcionarioModel = funcionarioModel;
    }
    async findAll() {
        return this.funcionarioModel.findAll();
    }
    async findOne(id) {
        return this.funcionarioModel.findByPk(id);
    }
    async create(data) {
        return this.funcionarioModel.create(data);
    }
    async update(id, data) {
        const [affectedCount, affectedRows] = await this.funcionarioModel.update(data, {
            where: { id },
            returning: true,
        });
        return [affectedCount, affectedRows];
    }
    async delete(id) {
        return this.funcionarioModel.destroy({
            where: { id },
        });
    }
    async findByEmail(email) {
        return this.funcionarioModel.findOne({
            where: { email },
        });
    }
    async findByCpf(cpf) {
        return this.funcionarioModel.findOne({
            where: { cpf },
        });
    }
    async findByEspecialidade(especialidade) {
        return this.funcionarioModel.findAll({
            where: { especialidade },
        });
    }
};
exports.FuncionarioRepository = FuncionarioRepository;
exports.FuncionarioRepository = FuncionarioRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(funcionario_model_1.Funcionario)),
    __metadata("design:paramtypes", [Object])
], FuncionarioRepository);
//# sourceMappingURL=funcionario.repository.js.map