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
exports.ServicoResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ServicoResponseDto {
}
exports.ServicoResponseDto = ServicoResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do serviço',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    __metadata("design:type", String)
], ServicoResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome do serviço',
        example: 'Desenvolvimento de API'
    }),
    __metadata("design:type", String)
], ServicoResponseDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descrição do serviço',
        example: 'Desenvolvimento de API RESTful com NestJS e Swagger'
    }),
    __metadata("design:type", String)
], ServicoResponseDto.prototype, "descricao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor do serviço',
        example: 2500.00
    }),
    __metadata("design:type", Number)
], ServicoResponseDto.prototype, "valor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status do serviço (ativo/inativo)',
        example: true
    }),
    __metadata("design:type", Boolean)
], ServicoResponseDto.prototype, "ativo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data de criação do serviço',
        example: '2025-05-21T17:32:28Z'
    }),
    __metadata("design:type", Date)
], ServicoResponseDto.prototype, "dataCriacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do funcionário responsável pelo serviço',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    __metadata("design:type", String)
], ServicoResponseDto.prototype, "funcionarioId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Dados do funcionário responsável pelo serviço',
        required: false,
        example: {
            id: '550e8400-e29b-41d4-a716-446655440000',
            nome: 'Maria Silva',
            email: 'maria.silva@adacompany.com'
        }
    }),
    __metadata("design:type", Object)
], ServicoResponseDto.prototype, "funcionario", void 0);
//# sourceMappingURL=servico-response.dto.js.map