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
exports.ClienteService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const cliente_model_1 = require("../../database/models/cliente.model");
let ClienteService = class ClienteService {
    constructor(clienteModel) {
        this.clienteModel = clienteModel;
    }
    async findAll() {
        return this.clienteModel.findAll();
    }
    async findOne(id) {
        const cliente = await this.clienteModel.findByPk(id);
        if (!cliente) {
            throw new common_1.NotFoundException(`Cliente com ID ${id} não encontrado`);
        }
        return cliente;
    }
    async findByEmail(email) {
        const cliente = await this.clienteModel.findOne({ where: { email } });
        return cliente;
    }
    async create(clienteData) {
        return this.clienteModel.create(clienteData);
    }
    async update(id, clienteData) {
        const cliente = await this.findOne(id);
        await cliente.update(clienteData);
    }
    async remove(id) {
        const cliente = await this.findOne(id);
        await cliente.destroy();
    }
};
exports.ClienteService = ClienteService;
exports.ClienteService = ClienteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(cliente_model_1.Cliente)),
    __metadata("design:paramtypes", [Object])
], ClienteService);
//# sourceMappingURL=cliente.service.js.map