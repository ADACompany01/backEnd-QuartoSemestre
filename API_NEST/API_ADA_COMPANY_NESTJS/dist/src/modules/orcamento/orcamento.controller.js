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
var OrcamentoController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrcamentoController = void 0;
const common_1 = require("@nestjs/common");
const orcamento_service_1 = require("./orcamento.service");
const create_orcamento_dto_1 = require("./dto/create-orcamento.dto");
const update_orcamento_dto_1 = require("./dto/update-orcamento.dto");
const orcamento_response_dto_1 = require("./dto/orcamento-response.dto");
const swagger_1 = require("@nestjs/swagger");
let OrcamentoController = OrcamentoController_1 = class OrcamentoController {
    constructor(orcamentoService) {
        this.orcamentoService = orcamentoService;
        this.logger = new common_1.Logger(OrcamentoController_1.name);
    }
    async findAll() {
        try {
            const orcamentos = await this.orcamentoService.findAll();
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Orçamentos encontrados com sucesso',
                data: orcamentos,
            };
        }
        catch (error) {
            this.logger.error(`Erro ao listar orçamentos: ${error.message}`, error.stack);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Erro ao listar orçamentos: ${error.message}`,
                error: error.name,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        const orcamento = await this.orcamentoService.findOne(id);
        return orcamento;
    }
    async create(createOrcamentoDto) {
        const orcamento = await this.orcamentoService.create(createOrcamentoDto);
        return orcamento;
    }
    async update(id, updateOrcamentoDto) {
        const orcamento = await this.orcamentoService.update(id, updateOrcamentoDto);
        return orcamento;
    }
    async remove(id) {
        await this.orcamentoService.remove(id);
        return { message: 'Orçamento removido com sucesso' };
    }
};
exports.OrcamentoController = OrcamentoController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os orçamentos' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de orçamentos retornada com sucesso',
        type: orcamento_response_dto_1.OrcamentoResponseDto,
        isArray: true
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrcamentoController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Buscar orçamento por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do orçamento' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Orçamento encontrado com sucesso',
        type: orcamento_response_dto_1.OrcamentoResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Orçamento não encontrado'
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrcamentoController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Criar um novo orçamento' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Orçamento criado com sucesso',
        type: orcamento_response_dto_1.OrcamentoResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Dados inválidos'
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Erro interno do servidor'
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_orcamento_dto_1.CreateOrcamentoDto]),
    __metadata("design:returntype", Promise)
], OrcamentoController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar um orçamento' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do orçamento' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Orçamento atualizado com sucesso',
        type: orcamento_response_dto_1.OrcamentoResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Orçamento não encontrado'
    }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_orcamento_dto_1.UpdateOrcamentoDto]),
    __metadata("design:returntype", Promise)
], OrcamentoController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Remover um orçamento' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do orçamento' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Orçamento removido com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Orçamento não encontrado'
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrcamentoController.prototype, "remove", null);
exports.OrcamentoController = OrcamentoController = OrcamentoController_1 = __decorate([
    (0, swagger_1.ApiTags)('orcamentos'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('orcamentos'),
    __metadata("design:paramtypes", [orcamento_service_1.OrcamentoService])
], OrcamentoController);
//# sourceMappingURL=orcamento.controller.js.map