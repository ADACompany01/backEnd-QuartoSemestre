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
var ClienteController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteController = void 0;
const common_1 = require("@nestjs/common");
const cliente_service_1 = require("./cliente.service");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const bcrypt = require("bcrypt");
let ClienteController = ClienteController_1 = class ClienteController {
    constructor(clienteService) {
        this.clienteService = clienteService;
        this.logger = new common_1.Logger(ClienteController_1.name);
    }
    async findAll() {
        const clientes = await this.clienteService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Clientes encontrados com sucesso',
            data: clientes.map(cliente => cliente.toJSON()),
        };
    }
    async findOne(id) {
        const cliente = await this.clienteService.findOne(id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Cliente encontrado com sucesso',
            data: cliente.toJSON(),
        };
    }
    async create(clienteData) {
        try {
            this.logger.log(`Tentando criar cliente: ${JSON.stringify(clienteData)}`);
            if (clienteData.senha) {
                const salt = await bcrypt.genSalt();
                clienteData.senha = await bcrypt.hash(clienteData.senha, salt);
            }
            const cliente = await this.clienteService.create(clienteData);
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Cliente criado com sucesso',
                data: cliente.toJSON(),
            };
        }
        catch (error) {
            this.logger.error(`Erro ao criar cliente: ${error.message}`, error.stack);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Erro ao criar cliente: ${error.message}`,
                error: error.name,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, clienteData) {
        if (clienteData.senha) {
            const salt = await bcrypt.genSalt();
            clienteData.senha = await bcrypt.hash(clienteData.senha, salt);
        }
        await this.clienteService.update(id, clienteData);
        const clienteAtualizado = await this.clienteService.findOne(id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Cliente atualizado com sucesso',
            data: clienteAtualizado.toJSON(),
        };
    }
    async remove(id) {
        await this.clienteService.remove(id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Cliente removido com sucesso',
        };
    }
};
exports.ClienteController = ClienteController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "findOne", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "remove", null);
exports.ClienteController = ClienteController = ClienteController_1 = __decorate([
    (0, common_1.Controller)('clientes'),
    __metadata("design:paramtypes", [cliente_service_1.ClienteService])
], ClienteController);
//# sourceMappingURL=cliente.controller.js.map