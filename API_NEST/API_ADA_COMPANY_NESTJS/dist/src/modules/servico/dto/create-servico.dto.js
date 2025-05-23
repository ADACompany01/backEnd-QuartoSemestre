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
exports.CreateServicoDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateServicoDto {
}
exports.CreateServicoDto = CreateServicoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome do serviço',
        example: 'Desenvolvimento de API'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateServicoDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descrição do serviço',
        example: 'Desenvolvimento de API RESTful com NestJS e Swagger',
        required: false
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateServicoDto.prototype, "descricao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor do serviço',
        example: 2500.00
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateServicoDto.prototype, "valor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status do serviço (ativo/inativo)',
        example: true,
        default: true,
        required: false
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateServicoDto.prototype, "ativo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do funcionário responsável pelo serviço',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateServicoDto.prototype, "funcionarioId", void 0);
//# sourceMappingURL=create-servico.dto.js.map