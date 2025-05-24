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
exports.ServicoService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const servico_model_1 = require("../../database/models/servico.model");
const sequelize_2 = require("sequelize");
let ServicoService = class ServicoService {
    constructor(servicoModel) {
        this.servicoModel = servicoModel;
    }
    async findAll() {
        return this.servicoModel.findAll({
            where: { ativo: true },
            include: ['funcionario']
        });
    }
    async findOne(id) {
        const servico = await this.servicoModel.findOne({
            where: { id, ativo: true },
            include: ['funcionario']
        });
        if (!servico) {
            throw new common_1.NotFoundException(`Serviço com ID ${id} não encontrado`);
        }
        return servico;
    }
    async create(servicoData) {
        const existingServico = await this.servicoModel.findOne({
            where: {
                nome: servicoData.nome,
                funcionarioId: servicoData.funcionarioId,
                ativo: true
            }
        });
        if (existingServico) {
            throw new common_1.ConflictException(`Já existe um serviço ativo com o nome '${servicoData.nome}' para este funcionário`);
        }
        return this.servicoModel.create(servicoData);
    }
    async update(id, servicoData) {
        const servico = await this.findOne(id);
        if (servicoData.nome && servicoData.nome !== servico.nome) {
            const existingServico = await this.servicoModel.findOne({
                where: {
                    nome: servicoData.nome,
                    funcionarioId: servico.funcionarioId,
                    ativo: true,
                    id: { [sequelize_2.Op.ne]: id }
                }
            });
            if (existingServico) {
                throw new common_1.ConflictException(`Já existe um serviço ativo com o nome '${servicoData.nome}' para este funcionário`);
            }
        }
        await servico.update(servicoData);
        return servico.reload();
    }
    async remove(id) {
        const servico = await this.findOne(id);
        await servico.update({ ativo: false });
    }
};
exports.ServicoService = ServicoService;
exports.ServicoService = ServicoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(servico_model_1.Servico)),
    __metadata("design:paramtypes", [Object])
], ServicoService);
//# sourceMappingURL=servico.service.js.map