"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const cliente_model_1 = require("./models/cliente.model");
const funcionario_model_1 = require("./models/funcionario.model");
const orcamento_model_1 = require("./models/orcamento.model");
const servico_model_1 = require("./models/servico.model");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'sqlite',
                storage: 'database.sqlite',
                autoLoadModels: true,
                synchronize: true,
                models: [cliente_model_1.Cliente, funcionario_model_1.Funcionario, orcamento_model_1.Orcamento, servico_model_1.Servico],
            }),
        ],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map