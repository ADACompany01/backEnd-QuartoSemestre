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
var ClienteService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const cliente_model_1 = require("../../database/models/cliente.model");
let ClienteService = ClienteService_1 = class ClienteService {
    constructor(clienteModel) {
        this.clienteModel = clienteModel;
        this.logger = new common_1.Logger(ClienteService_1.name);
    }
    async findAll() {
        return this.clienteModel.findAll({ where: { ativo: true } });
    }
    async findOne(id) {
        const cliente = await this.clienteModel.findOne({ where: { id, ativo: true } });
        if (!cliente) {
            throw new common_1.NotFoundException(`Cliente com ID ${id} não encontrado`);
        }
        return cliente;
    }
    async findByEmail(email) {
        const cliente = await this.clienteModel.findOne({ where: { email, ativo: true } });
        if (!cliente) {
            throw new common_1.NotFoundException(`Cliente com email ${email} não encontrado`);
        }
        return cliente;
    }
    async findByEmailWithoutException(email) {
        return this.clienteModel.findOne({ where: { email, ativo: true } });
    }
    async create(clienteData) {
        try {
            const existingByEmail = await this.clienteModel.findOne({
                where: { email: clienteData.email }
            });
            if (existingByEmail) {
                throw new common_1.ConflictException(`Cliente com email ${clienteData.email} já existe`);
            }
            if (clienteData.cpf) {
                const existingByCpf = await this.clienteModel.findOne({
                    where: { cpf: clienteData.cpf }
                });
                if (existingByCpf) {
                    throw new common_1.ConflictException(`Cliente com CPF ${clienteData.cpf} já existe`);
                }
            }
            const dataToCreate = {
                ...clienteData,
                ativo: clienteData.ativo ?? true,
                dataCriacao: clienteData.dataCriacao ?? new Date(),
            };
            if (!dataToCreate.cpf || dataToCreate.cpf.trim() === '') {
                dataToCreate.cpf = null;
            }
            const cliente = await this.clienteModel.create(dataToCreate);
            return cliente;
        }
        catch (error) {
            this.logger.error(`Erro ao criar cliente: ${error.message}`, error.stack);
            throw error;
        }
    }
    async update(id, clienteData) {
        try {
            const cliente = await this.findOne(id);
            if (clienteData.email && clienteData.email !== cliente.email) {
                const existingByEmail = await this.clienteModel.findOne({
                    where: { email: clienteData.email }
                });
                if (existingByEmail) {
                    throw new common_1.ConflictException(`Cliente com email ${clienteData.email} já existe`);
                }
            }
            if (clienteData.cpf && clienteData.cpf !== cliente.cpf) {
                const existingByCpf = await this.clienteModel.findOne({
                    where: { cpf: clienteData.cpf }
                });
                if (existingByCpf) {
                    throw new common_1.ConflictException(`Cliente com CPF ${clienteData.cpf} já existe`);
                }
            }
            if (clienteData.cpf !== undefined && (!clienteData.cpf || clienteData.cpf.trim() === '')) {
                clienteData.cpf = null;
            }
            await cliente.update(clienteData);
            return cliente.reload();
        }
        catch (error) {
            this.logger.error(`Erro ao atualizar cliente: ${error.message}`, error.stack);
            throw error;
        }
    }
    async remove(id) {
        try {
            const cliente = await this.findOne(id);
            await cliente.update({ ativo: false });
        }
        catch (error) {
            this.logger.error(`Erro ao remover cliente: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.ClienteService = ClienteService;
exports.ClienteService = ClienteService = ClienteService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(cliente_model_1.Cliente)),
    __metadata("design:paramtypes", [Object])
], ClienteService);
//# sourceMappingURL=cliente.service.js.map