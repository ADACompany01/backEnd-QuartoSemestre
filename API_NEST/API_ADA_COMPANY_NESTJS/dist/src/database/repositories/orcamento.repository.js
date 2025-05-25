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
const orcamento_entity_1 = require("../entities/orcamento.entity");
const pacote_entity_1 = require("../entities/pacote.entity");
const cliente_entity_1 = require("../entities/cliente.entity");
const contrato_entity_1 = require("../entities/contrato.entity");
let OrcamentoRepository = class OrcamentoRepository {
    constructor(orcamentoModel) {
        this.orcamentoModel = orcamentoModel;
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
        return this.orcamentoModel.findByPk(id, {
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
    async findByPacote(id_pacote) {
        return this.orcamentoModel.findOne({
            where: { id_pacote },
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
    async findByCliente(id_cliente) {
        return this.orcamentoModel.findAll({
            where: { id_cliente },
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
    async create(data) {
        return this.orcamentoModel.create(data);
    }
    async update(id, data) {
        return this.orcamentoModel.update(data, {
            where: { cod_orcamento: id },
            returning: true
        });
    }
    async delete(id) {
        return this.orcamentoModel.destroy({
            where: { cod_orcamento: id }
        });
    }
};
exports.OrcamentoRepository = OrcamentoRepository;
exports.OrcamentoRepository = OrcamentoRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(orcamento_entity_1.Orcamento)),
    __metadata("design:paramtypes", [Object])
], OrcamentoRepository);
//# sourceMappingURL=orcamento.repository.js.map