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
var ClienteController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteController = void 0;
const common_1 = require("@nestjs/common");
const cliente_service_1 = require("./cliente.service");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const bcrypt = require("bcrypt");
const create_cliente_dto_1 = require("./dto/create-cliente.dto");
const update_cliente_dto_1 = require("./dto/update-cliente.dto");
const cliente_response_dto_1 = require("./dto/cliente-response.dto");
const swagger_1 = require("@nestjs/swagger");
let ClienteController = ClienteController_1 = class ClienteController {
    constructor(clienteService) {
        this.clienteService = clienteService;
        this.logger = new common_1.Logger(ClienteController_1.name);
    }
    async findAll() {
        const clientes = await this.clienteService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Clientes encontrados com sucesso',
            data: clientes.map(cliente => cliente.toJSON()),
        };
    }
    async findOne(id) {
        const cliente = await this.clienteService.findOne(id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Cliente encontrado com sucesso',
            data: cliente.toJSON(),
        };
    }
    async create(createClienteDto) {
        try {
            this.logger.log(`Tentando criar cliente: ${JSON.stringify(createClienteDto)}`);
            if (createClienteDto.senha) {
                const salt = await bcrypt.genSalt();
                createClienteDto.senha = await bcrypt.hash(createClienteDto.senha, salt);
            }
            const clienteExistente = await this.clienteService.findByEmailWithoutException(createClienteDto.email);
            if (clienteExistente) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Já existe um cliente com este email',
                    error: 'Bad Request',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const cliente = await this.clienteService.create(createClienteDto);
            const clienteJSON = cliente.toJSON();
            delete clienteJSON.senha;
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Cliente criado com sucesso',
                data: clienteJSON,
            };
        }
        catch (error) {
            this.logger.error(`Erro ao criar cliente: ${error.message}`, error.stack);
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Erro ao criar cliente: ${error.message}`,
                error: error.name,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateClienteDto) {
        try {
            if (updateClienteDto.senha) {
                const salt = await bcrypt.genSalt();
                updateClienteDto.senha = await bcrypt.hash(updateClienteDto.senha, salt);
            }
            const clienteAtualizado = await this.clienteService.update(id, updateClienteDto);
            const clienteJSON = clienteAtualizado.toJSON();
            delete clienteJSON.senha;
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Cliente atualizado com sucesso',
                data: clienteJSON,
            };
        }
        catch (error) {
            this.logger.error(`Erro ao atualizar cliente: ${error.message}`, error.stack);
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Erro ao atualizar cliente: ${error.message}`,
                error: error.name,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            await this.clienteService.remove(id);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Cliente removido com sucesso',
            };
        }
        catch (error) {
            this.logger.error(`Erro ao remover cliente: ${error.message}`, error.stack);
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Erro ao remover cliente: ${error.message}`,
                error: error.name,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ClienteController = ClienteController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os clientes' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de clientes retornada com sucesso',
        type: cliente_response_dto_1.ClienteResponseDto,
        isArray: true
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Buscar cliente por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do cliente' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cliente encontrado com sucesso',
        type: cliente_response_dto_1.ClienteResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Cliente não encontrado'
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Criar um novo cliente' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Cliente criado com sucesso',
        type: cliente_response_dto_1.ClienteResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Dados inválidos'
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Erro interno do servidor'
    }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cliente_dto_1.CreateClienteDto]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar um cliente' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do cliente' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cliente atualizado com sucesso',
        type: cliente_response_dto_1.ClienteResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Cliente não encontrado'
    }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cliente_dto_1.UpdateClienteDto]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Remover um cliente' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do cliente' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cliente removido com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Cliente não encontrado'
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "remove", null);
exports.ClienteController = ClienteController = ClienteController_1 = __decorate([
    (0, swagger_1.ApiTags)('clientes'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('clientes'),
    __metadata("design:paramtypes", [cliente_service_1.ClienteService])
], ClienteController);
//# sourceMappingURL=cliente.controller.js.map