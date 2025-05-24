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
exports.ServicoRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const servico_model_1 = require("../models/servico.model");
const funcionario_model_1 = require("../models/funcionario.model");
let ServicoRepository = class ServicoRepository {
    constructor(servicoModel) {
        this.servicoModel = servicoModel;
    }
    async findAll() {
        return this.servicoModel.findAll({
            include: [funcionario_model_1.Funcionario],
        });
    }
    async findOne(id) {
        return this.servicoModel.findByPk(id, {
            include: [funcionario_model_1.Funcionario],
        });
    }
    async create(data) {
        return this.servicoModel.create(data);
    }
    async update(id, data) {
        const [affectedCount, affectedRows] = await this.servicoModel.update(data, {
            where: { id },
            returning: true,
        });
        return [affectedCount, affectedRows];
    }
    async delete(id) {
        return this.servicoModel.destroy({
            where: { id },
        });
    }
    async findByFuncionario(funcionarioId) {
        return this.servicoModel.findAll({
            where: { funcionarioId },
            include: [funcionario_model_1.Funcionario],
        });
    }
    async findAtivos() {
        return this.servicoModel.findAll({
            where: { ativo: true },
            include: [funcionario_model_1.Funcionario],
        });
    }
};
exports.ServicoRepository = ServicoRepository;
exports.ServicoRepository = ServicoRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(servico_model_1.Servico)),
    __metadata("design:paramtypes", [Object])
], ServicoRepository);
//# sourceMappingURL=servico.repository.js.map