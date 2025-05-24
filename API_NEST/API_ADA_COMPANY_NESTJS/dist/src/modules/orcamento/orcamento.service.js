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
exports.OrcamentoService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const orcamento_model_1 = require("../../database/models/orcamento.model");
const sequelize_2 = require("sequelize");
let OrcamentoService = class OrcamentoService {
    constructor(orcamentoModel) {
        this.orcamentoModel = orcamentoModel;
    }
    async findAll() {
        return this.orcamentoModel.findAll({
            where: { ativo: true },
            include: [
                'cliente',
                {
                    association: 'servico',
                    include: ['funcionario']
                }
            ]
        });
    }
    async findOne(id) {
        const orcamento = await this.orcamentoModel.findOne({
            where: { id, ativo: true },
            include: [
                'cliente',
                {
                    association: 'servico',
                    include: ['funcionario']
                }
            ]
        });
        if (!orcamento) {
            throw new common_1.NotFoundException(`Orçamento com ID ${id} não encontrado`);
        }
        return orcamento;
    }
    async create(orcamentoData) {
        const existingOrcamento = await this.orcamentoModel.findOne({
            where: {
                clienteId: orcamentoData.clienteId,
                servicoId: orcamentoData.servicoId,
                dataServico: orcamentoData.dataServico,
                ativo: true,
                status: { [sequelize_2.Op.ne]: 'cancelado' }
            }
        });
        if (existingOrcamento) {
            throw new common_1.ConflictException(`Já existe um orçamento ativo para este cliente e serviço na data especificada`);
        }
        return this.orcamentoModel.create(orcamentoData);
    }
    async update(id, orcamentoData) {
        const orcamento = await this.findOne(id);
        if ((orcamentoData.clienteId && orcamentoData.clienteId !== orcamento.clienteId) ||
            (orcamentoData.servicoId && orcamentoData.servicoId !== orcamento.servicoId) ||
            (orcamentoData.dataServico && orcamentoData.dataServico !== orcamento.dataServico)) {
            const existingOrcamento = await this.orcamentoModel.findOne({
                where: {
                    clienteId: orcamentoData.clienteId || orcamento.clienteId,
                    servicoId: orcamentoData.servicoId || orcamento.servicoId,
                    dataServico: orcamentoData.dataServico || orcamento.dataServico,
                    ativo: true,
                    id: { [sequelize_2.Op.ne]: id },
                    status: { [sequelize_2.Op.ne]: 'cancelado' }
                }
            });
            if (existingOrcamento) {
                throw new common_1.ConflictException(`Já existe um orçamento ativo para este cliente e serviço na data especificada`);
            }
        }
        await orcamento.update(orcamentoData);
        return orcamento.reload();
    }
    async changeStatus(id, status) {
        const orcamento = await this.findOne(id);
        await orcamento.update({ status });
        return orcamento.reload();
    }
    async remove(id) {
        const orcamento = await this.findOne(id);
        await orcamento.update({ ativo: false });
    }
};
exports.OrcamentoService = OrcamentoService;
exports.OrcamentoService = OrcamentoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(orcamento_model_1.Orcamento)),
    __metadata("design:paramtypes", [Object])
], OrcamentoService);
//# sourceMappingURL=orcamento.service.js.map