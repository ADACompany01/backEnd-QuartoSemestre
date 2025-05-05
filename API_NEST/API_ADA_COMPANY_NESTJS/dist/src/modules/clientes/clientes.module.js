"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const cliente_model_1 = require("../../database/models/cliente.model");
const cliente_repository_1 = require("../../database/repositories/cliente.repository");
const clientes_controller_1 = require("./clientes.controller");
const clientes_service_1 = require("./clientes.service");
let ClientesModule = class ClientesModule {
};
exports.ClientesModule = ClientesModule;
exports.ClientesModule = ClientesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([cliente_model_1.Cliente]),
        ],
        controllers: [clientes_controller_1.ClientesController],
        providers: [
            clientes_service_1.ClientesService,
            cliente_repository_1.ClienteRepository,
        ],
        exports: [cliente_repository_1.ClienteRepository],
    })
], ClientesModule);
//# sourceMappingURL=clientes.module.js.map