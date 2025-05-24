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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicoController = void 0;
const common_1 = require("@nestjs/common");
const servico_service_1 = require("./servico.service");
const create_servico_dto_1 = require("./dto/create-servico.dto");
const update_servico_dto_1 = require("./dto/update-servico.dto");
const servico_response_dto_1 = require("./dto/servico-response.dto");
const swagger_1 = require("@nestjs/swagger");
let ServicoController = class ServicoController {
    constructor(servicoService) {
        this.servicoService = servicoService;
    }
    async findAll() {
        const servicos = await this.servicoService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Serviços encontrados com sucesso',
            data: servicos.map(servico => servico.toJSON()),
        };
    }
    async findOne(id) {
        const servico = await this.servicoService.findOne(id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Serviço encontrado com sucesso',
            data: servico.toJSON(),
        };
    }
    async create(createServicoDto) {
        const servico = await this.servicoService.create(createServicoDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Serviço criado com sucesso',
            data: servico.toJSON(),
        };
    }
    async update(id, updateServicoDto) {
        const servico = await this.servicoService.update(id, updateServicoDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Serviço atualizado com sucesso',
            data: servico.toJSON(),
        };
    }
    async remove(id) {
        await this.servicoService.remove(id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Serviço removido com sucesso',
        };
    }
};
exports.ServicoController = ServicoController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os serviços' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de serviços retornada com sucesso',
        type: servico_response_dto_1.ServicoResponseDto,
        isArray: true
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServicoController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Buscar serviço por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do serviço' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Serviço encontrado com sucesso',
        type: servico_response_dto_1.ServicoResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Serviço não encontrado'
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServicoController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Criar um novo serviço' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Serviço criado com sucesso',
        type: servico_response_dto_1.ServicoResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Dados inválidos'
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_servico_dto_1.CreateServicoDto]),
    __metadata("design:returntype", Promise)
], ServicoController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar um serviço' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do serviço' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Serviço atualizado com sucesso',
        type: servico_response_dto_1.ServicoResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Serviço não encontrado'
    }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_servico_dto_1.UpdateServicoDto]),
    __metadata("design:returntype", Promise)
], ServicoController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Remover um serviço' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do serviço' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Serviço removido com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Serviço não encontrado'
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServicoController.prototype, "remove", null);
exports.ServicoController = ServicoController = __decorate([
    (0, swagger_1.ApiTags)('servicos'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('servicos'),
    __metadata("design:paramtypes", [servico_service_1.ServicoService])
], ServicoController);
//# sourceMappingURL=servico.controller.js.map