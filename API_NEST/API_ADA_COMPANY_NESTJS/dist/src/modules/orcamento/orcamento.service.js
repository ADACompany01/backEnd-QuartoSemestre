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
var OrcamentoService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrcamentoService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const orcamento_entity_1 = require("../../database/entities/orcamento.entity");
const pacote_entity_1 = require("../../database/entities/pacote.entity");
const cliente_entity_1 = require("../../database/entities/cliente.entity");
const contrato_entity_1 = require("../../database/entities/contrato.entity");
const sequelize_2 = require("sequelize");
let OrcamentoService = OrcamentoService_1 = class OrcamentoService {
    constructor(orcamentoModel) {
        this.orcamentoModel = orcamentoModel;
        this.logger = new common_1.Logger(OrcamentoService_1.name);
    }
    async findAll() {
        return this.orcamentoModel.findAll({
            include: [
                {
                    model: pacote_entity_1.Pacote,
                    include: [cliente_entity_1.Cliente]
                },
                cliente_entity_1.Cliente,
                contrato_entity_1.Contrato
            ]
        });
    }
    async findOne(id) {
        const orcamento = await this.orcamentoModel.findByPk(id, {
            include: [
                {
                    model: pacote_entity_1.Pacote,
                    include: [cliente_entity_1.Cliente]
                },
                cliente_entity_1.Cliente,
                contrato_entity_1.Contrato
            ]
        });
        if (!orcamento) {
            throw new common_1.NotFoundException(`Orçamento com ID ${id} não encontrado`);
        }
        return orcamento;
    }
    async create(orcamentoData) {
        try {
            const existingOrcamento = await this.orcamentoModel.findOne({
                where: {
                    id_pacote: orcamentoData.id_pacote
                }
            });
            if (existingOrcamento) {
                throw new common_1.ConflictException(`Já existe um orçamento para este pacote`);
            }
            const pacote = await pacote_entity_1.Pacote.findByPk(orcamentoData.id_pacote);
            if (!pacote) {
                throw new common_1.NotFoundException(`Pacote com ID ${orcamentoData.id_pacote} não encontrado`);
            }
            const cliente = await cliente_entity_1.Cliente.findByPk(orcamentoData.id_cliente);
            if (!cliente) {
                throw new common_1.NotFoundException(`Cliente com ID ${orcamentoData.id_cliente} não encontrado`);
            }
            const dataAtual = new Date();
            const dataValidade = new Date();
            dataValidade.setDate(dataValidade.getDate() + 30);
            const orcamento = await this.orcamentoModel.create({
                ...orcamentoData,
                data_orcamento: dataAtual,
                data_validade: dataValidade
            });
            return this.findOne(orcamento.cod_orcamento);
        }
        catch (error) {
            this.logger.error(`Erro ao criar orçamento: ${error.message}`, error.stack);
            throw error;
        }
    }
    async update(id, orcamentoData) {
        try {
            const orcamento = await this.findOne(id);
            if (orcamentoData.id_pacote && orcamentoData.id_pacote !== orcamento.id_pacote) {
                const existingOrcamento = await this.orcamentoModel.findOne({
                    where: {
                        id_pacote: orcamentoData.id_pacote,
                        cod_orcamento: { [sequelize_2.Op.ne]: id }
                    }
                });
                if (existingOrcamento) {
                    throw new common_1.ConflictException(`Já existe um orçamento para este pacote`);
                }
                const pacote = await pacote_entity_1.Pacote.findByPk(orcamentoData.id_pacote);
                if (!pacote) {
                    throw new common_1.NotFoundException(`Pacote com ID ${orcamentoData.id_pacote} não encontrado`);
                }
            }
            if (orcamentoData.id_cliente && orcamentoData.id_cliente !== orcamento.id_cliente) {
                const cliente = await cliente_entity_1.Cliente.findByPk(orcamentoData.id_cliente);
                if (!cliente) {
                    throw new common_1.NotFoundException(`Cliente com ID ${orcamentoData.id_cliente} não encontrado`);
                }
            }
            await orcamento.update(orcamentoData);
            return this.findOne(id);
        }
        catch (error) {
            this.logger.error(`Erro ao atualizar orçamento: ${error.message}`, error.stack);
            throw error;
        }
    }
    async remove(id) {
        try {
            const orcamento = await this.findOne(id);
            await orcamento.destroy();
        }
        catch (error) {
            this.logger.error(`Erro ao remover orçamento: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.OrcamentoService = OrcamentoService;
exports.OrcamentoService = OrcamentoService = OrcamentoService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(orcamento_entity_1.Orcamento)),
    __metadata("design:paramtypes", [Object])
], OrcamentoService);
//# sourceMappingURL=orcamento.service.js.map