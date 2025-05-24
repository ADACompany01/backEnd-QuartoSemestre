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
exports.OrcamentoController = void 0;
const common_1 = require("@nestjs/common");
const orcamento_service_1 = require("./orcamento.service");
let OrcamentoController = class OrcamentoController {
    constructor(orcamentoService) {
        this.orcamentoService = orcamentoService;
    }
    async findAll() {
        const orcamentos = await this.orcamentoService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Orçamentos encontrados com sucesso',
            data: orcamentos.map(orcamento => orcamento.toJSON()),
        };
    }
    async findOne(id) {
        const orcamento = await this.orcamentoService.findOne(id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Orçamento encontrado com sucesso',
            data: orcamento.toJSON(),
        };
    }
    async create(orcamentoData) {
        const orcamento = await this.orcamentoService.create(orcamentoData);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Orçamento criado com sucesso',
            data: orcamento.toJSON(),
        };
    }
    async update(id, orcamentoData) {
        const orcamento = await this.orcamentoService.update(id, orcamentoData);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Orçamento atualizado com sucesso',
            data: orcamento.toJSON(),
        };
    }
    async changeStatus(id, status) {
        const orcamento = await this.orcamentoService.changeStatus(id, status);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: `Status do orçamento alterado para ${status} com sucesso`,
            data: orcamento.toJSON(),
        };
    }
    async remove(id) {
        await this.orcamentoService.remove(id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Orçamento removido com sucesso',
        };
    }
};
exports.OrcamentoController = OrcamentoController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrcamentoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrcamentoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrcamentoController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrcamentoController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrcamentoController.prototype, "changeStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrcamentoController.prototype, "remove", null);
exports.OrcamentoController = OrcamentoController = __decorate([
    (0, common_1.Controller)('orcamentos'),
    __metadata("design:paramtypes", [orcamento_service_1.OrcamentoService])
], OrcamentoController);
//# sourceMappingURL=orcamento.controller.js.map