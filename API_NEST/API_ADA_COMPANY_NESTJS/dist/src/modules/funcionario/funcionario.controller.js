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
var FuncionarioController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncionarioController = void 0;
const common_1 = require("@nestjs/common");
const funcionario_service_1 = require("./funcionario.service");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const create_funcionario_dto_1 = require("./dto/create-funcionario.dto");
const update_funcionario_dto_1 = require("./dto/update-funcionario.dto");
const funcionario_response_dto_1 = require("./dto/funcionario-response.dto");
const swagger_1 = require("@nestjs/swagger");
let FuncionarioController = FuncionarioController_1 = class FuncionarioController {
    constructor(funcionarioService) {
        this.funcionarioService = funcionarioService;
        this.logger = new common_1.Logger(FuncionarioController_1.name);
    }
    async findAll() {
        const funcionarios = await this.funcionarioService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Funcionários encontrados com sucesso',
            data: funcionarios.map(f => f.toJSON()),
        };
    }
    async findOne(id) {
        const funcionario = await this.funcionarioService.findOne(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Funcionário encontrado com sucesso',
            data: funcionario.toJSON(),
        };
    }
    async create(createFuncionarioDto) {
        try {
            this.logger.log(`Tentando criar funcionário: ${JSON.stringify(createFuncionarioDto)}`);
            const funcionarioExistente = await this.funcionarioService.findByEmailWithoutException(createFuncionarioDto.email);
            if (funcionarioExistente) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Já existe um funcionário com este email',
                    error: 'Bad Request',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const funcionario = await this.funcionarioService.create(createFuncionarioDto);
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Funcionário criado com sucesso',
                data: funcionario.toJSON(),
            };
        }
        catch (error) {
            this.logger.error(`Erro ao criar funcionário: ${error.message}`, error.stack);
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Erro ao criar funcionário: ${error.message}`,
                error: error.name,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateFuncionarioDto) {
        try {
            const funcionario = await this.funcionarioService.update(+id, updateFuncionarioDto);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Funcionário atualizado com sucesso',
                data: funcionario.toJSON(),
            };
        }
        catch (error) {
            this.logger.error(`Erro ao atualizar funcionário: ${error.message}`, error.stack);
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Erro ao atualizar funcionário: ${error.message}`,
                error: error.name,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            await this.funcionarioService.remove(+id);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Funcionário removido com sucesso',
            };
        }
        catch (error) {
            this.logger.error(`Erro ao remover funcionário: ${error.message}`, error.stack);
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Erro ao remover funcionário: ${error.message}`,
                error: error.name,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.FuncionarioController = FuncionarioController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os funcionários' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de funcionários retornada com sucesso',
        type: funcionario_response_dto_1.FuncionarioResponseDto,
        isArray: true
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FuncionarioController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Buscar funcionário por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do funcionário' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Funcionário encontrado com sucesso',
        type: funcionario_response_dto_1.FuncionarioResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Funcionário não encontrado'
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FuncionarioController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Criar um novo funcionário' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Funcionário criado com sucesso',
        type: funcionario_response_dto_1.FuncionarioResponseDto
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
    __metadata("design:paramtypes", [create_funcionario_dto_1.CreateFuncionarioDto]),
    __metadata("design:returntype", Promise)
], FuncionarioController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar um funcionário' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do funcionário' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Funcionário atualizado com sucesso',
        type: funcionario_response_dto_1.FuncionarioResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Funcionário não encontrado'
    }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_funcionario_dto_1.UpdateFuncionarioDto]),
    __metadata("design:returntype", Promise)
], FuncionarioController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Remover um funcionário' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do funcionário' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Funcionário removido com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Funcionário não encontrado'
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FuncionarioController.prototype, "remove", null);
exports.FuncionarioController = FuncionarioController = FuncionarioController_1 = __decorate([
    (0, swagger_1.ApiTags)('funcionarios'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('funcionarios'),
    __metadata("design:paramtypes", [funcionario_service_1.FuncionarioService])
], FuncionarioController);
//# sourceMappingURL=funcionario.controller.js.map