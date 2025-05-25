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
const cliente_entity_1 = require("./entities/cliente.entity");
const funcionario_entity_1 = require("./entities/funcionario.entity");
const pacote_entity_1 = require("./entities/pacote.entity");
const orcamento_entity_1 = require("./entities/orcamento.entity");
const contrato_entity_1 = require("./entities/contrato.entity");
const usuario_entity_1 = require("./entities/usuario.entity");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'sqlite',
                storage: './database.sqlite',
                autoLoadModels: true,
                synchronize: false,
                models: [cliente_entity_1.Cliente, funcionario_entity_1.Funcionario, pacote_entity_1.Pacote, orcamento_entity_1.Orcamento, contrato_entity_1.Contrato, usuario_entity_1.Usuario],
            }),
            sequelize_1.SequelizeModule.forFeature([
                cliente_entity_1.Cliente,
                funcionario_entity_1.Funcionario,
                pacote_entity_1.Pacote,
                orcamento_entity_1.Orcamento,
                contrato_entity_1.Contrato,
                usuario_entity_1.Usuario,
            ]),
        ],
        exports: [sequelize_1.SequelizeModule],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map