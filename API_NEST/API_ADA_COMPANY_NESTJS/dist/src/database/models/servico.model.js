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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Servico = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const funcionario_model_1 = require("./funcionario.model");
const orcamento_model_1 = require("./orcamento.model");
let Servico = class Servico extends sequelize_typescript_1.Model {
};
exports.Servico = Servico;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    __metadata("design:type", String)
], Servico.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Servico.prototype, "nome", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
    }),
    __metadata("design:type", String)
], Servico.prototype, "descricao", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Servico.prototype, "valor", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: true,
    }),
    __metadata("design:type", Boolean)
], Servico.prototype, "ativo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", Date)
], Servico.prototype, "dataCriacao", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => funcionario_model_1.Funcionario),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], Servico.prototype, "funcionarioId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => funcionario_model_1.Funcionario),
    __metadata("design:type", funcionario_model_1.Funcionario)
], Servico.prototype, "funcionario", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => orcamento_model_1.Orcamento),
    __metadata("design:type", Array)
], Servico.prototype, "orcamentos", void 0);
exports.Servico = Servico = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'servicos',
        timestamps: false,
    })
], Servico);
//# sourceMappingURL=servico.model.js.map