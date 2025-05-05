"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrcamentoModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const orcamento_model_1 = require("../../database/models/orcamento.model");
const orcamento_repository_1 = require("../../database/repositories/orcamento.repository");
const orcamento_controller_1 = require("./orcamento.controller");
const orcamento_service_1 = require("./orcamento.service");
const cliente_module_1 = require("../cliente/cliente.module");
const servico_module_1 = require("../servico/servico.module");
const database_module_1 = require("../../database/database.module");
let OrcamentoModule = class OrcamentoModule {
};
exports.OrcamentoModule = OrcamentoModule;
exports.OrcamentoModule = OrcamentoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            sequelize_1.SequelizeModule.forFeature([orcamento_model_1.Orcamento]),
            cliente_module_1.ClienteModule,
            servico_module_1.ServicoModule,
        ],
        controllers: [orcamento_controller_1.OrcamentoController],
        providers: [
            orcamento_service_1.OrcamentoService,
            orcamento_repository_1.OrcamentoRepository
        ],
        exports: [orcamento_repository_1.OrcamentoRepository]
    })
], OrcamentoModule);
//# sourceMappingURL=orcamento.module.js.map