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
exports.OrcamentoRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const orcamento_model_1 = require("../models/orcamento.model");
const cliente_model_1 = require("../models/cliente.model");
const servico_model_1 = require("../models/servico.model");
let OrcamentoRepository = class OrcamentoRepository {
    constructor(orcamentoModel) {
        this.orcamentoModel = orcamentoModel;
    }
    async findAll() {
        return this.orcamentoModel.findAll({
            include: [cliente_model_1.Cliente, servico_model_1.Servico],
        });
    }
    async findOne(id) {
        return this.orcamentoModel.findByPk(id, {
            include: [cliente_model_1.Cliente, servico_model_1.Servico],
        });
    }
    async create(data) {
        return this.orcamentoModel.create(data);
    }
    async update(id, data) {
        const [affectedCount, affectedRows] = await this.orcamentoModel.update(data, {
            where: { id },
            returning: true,
        });
        return [affectedCount, affectedRows];
    }
    async delete(id) {
        return this.orcamentoModel.destroy({
            where: { id },
        });
    }
    async findByCliente(clienteId) {
        return this.orcamentoModel.findAll({
            where: { clienteId },
            include: [cliente_model_1.Cliente, servico_model_1.Servico],
        });
    }
    async findByServico(servicoId) {
        return this.orcamentoModel.findAll({
            where: { servicoId },
            include: [cliente_model_1.Cliente, servico_model_1.Servico],
        });
    }
    async findByStatus(status) {
        return this.orcamentoModel.findAll({
            where: { status },
            include: [cliente_model_1.Cliente, servico_model_1.Servico],
        });
    }
    async findAtivos() {
        return this.orcamentoModel.findAll({
            where: { ativo: true },
            include: [cliente_model_1.Cliente, servico_model_1.Servico],
        });
    }
};
exports.OrcamentoRepository = OrcamentoRepository;
exports.OrcamentoRepository = OrcamentoRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(orcamento_model_1.Orcamento)),
    __metadata("design:paramtypes", [Object])
], OrcamentoRepository);
//# sourceMappingURL=orcamento.repository.js.map