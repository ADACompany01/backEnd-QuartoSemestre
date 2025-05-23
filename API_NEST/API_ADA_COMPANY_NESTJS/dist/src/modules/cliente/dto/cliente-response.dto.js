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
exports.ClienteResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ClienteResponseDto {
}
exports.ClienteResponseDto = ClienteResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do cliente',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    __metadata("design:type", String)
], ClienteResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome do cliente',
        example: 'João Silva'
    }),
    __metadata("design:type", String)
], ClienteResponseDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email do cliente',
        example: 'joao.silva@email.com'
    }),
    __metadata("design:type", String)
], ClienteResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Telefone do cliente',
        example: '(11) 98765-4321'
    }),
    __metadata("design:type", String)
], ClienteResponseDto.prototype, "telefone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'CPF do cliente',
        example: '123.456.789-00'
    }),
    __metadata("design:type", String)
], ClienteResponseDto.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Endereço do cliente',
        example: 'Rua das Flores, 123'
    }),
    __metadata("design:type", String)
], ClienteResponseDto.prototype, "endereco", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status do cliente (ativo/inativo)',
        example: true
    }),
    __metadata("design:type", Boolean)
], ClienteResponseDto.prototype, "ativo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data de criação do cliente',
        example: '2025-05-21T17:32:28Z'
    }),
    __metadata("design:type", Date)
], ClienteResponseDto.prototype, "dataCriacao", void 0);
//# sourceMappingURL=cliente-response.dto.js.map