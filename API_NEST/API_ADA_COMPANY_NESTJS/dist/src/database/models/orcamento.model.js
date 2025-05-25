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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orcamento = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const cliente_model_1 = require("./cliente.model");
const servico_model_1 = require("./servico.model");
let Orcamento = class Orcamento extends sequelize_typescript_1.Model {
};
exports.Orcamento = Orcamento;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    __metadata("design:type", String)
], Orcamento.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], Orcamento.prototype, "dataServico", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Orcamento.prototype, "valorTotal", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        defaultValue: 'pendente',
        validate: {
            isIn: [['pendente', 'aprovado', 'recusado', 'cancelado', 'finalizado']]
        }
    }),
    __metadata("design:type", String)
], Orcamento.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Orcamento.prototype, "observacoes", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: true,
    }),
    __metadata("design:type", Boolean)
], Orcamento.prototype, "ativo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", Date)
], Orcamento.prototype, "dataCriacao", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => cliente_model_1.Cliente),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Orcamento.prototype, "clienteId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => cliente_model_1.Cliente),
    __metadata("design:type", cliente_model_1.Cliente)
], Orcamento.prototype, "cliente", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => servico_model_1.Servico),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Orcamento.prototype, "servicoId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => servico_model_1.Servico),
    __metadata("design:type", typeof (_a = typeof servico_model_1.Servico !== "undefined" && servico_model_1.Servico) === "function" ? _a : Object)
], Orcamento.prototype, "servico", void 0);
exports.Orcamento = Orcamento = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'orcamentos',
        timestamps: false,
    })
], Orcamento);
//# sourceMappingURL=orcamento.model.js.map