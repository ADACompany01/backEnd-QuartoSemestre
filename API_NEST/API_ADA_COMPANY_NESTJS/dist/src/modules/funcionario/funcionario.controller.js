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
exports.FuncionarioController = void 0;
const common_1 = require("@nestjs/common");
const funcionario_service_1 = require("./funcionario.service");
let FuncionarioController = class FuncionarioController {
    constructor(funcionarioService) {
        this.funcionarioService = funcionarioService;
    }
    async findAll() {
        const funcionarios = await this.funcionarioService.findAll();
        const funcionariosSemSenha = funcionarios.map(f => {
            const { senha, ...funcionarioSemSenha } = f.toJSON();
            return funcionarioSemSenha;
        });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Funcionários encontrados com sucesso',
            data: funcionariosSemSenha,
        };
    }
    async findOne(id) {
        const funcionario = await this.funcionarioService.findOne(id);
        const { senha, ...funcionarioSemSenha } = funcionario.toJSON();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Funcionário encontrado com sucesso',
            data: funcionarioSemSenha,
        };
    }
    async create(funcionarioData) {
        const funcionario = await this.funcionarioService.create(funcionarioData);
        const { senha, ...funcionarioSemSenha } = funcionario.toJSON();
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Funcionário criado com sucesso',
            data: funcionarioSemSenha,
        };
    }
    async update(id, funcionarioData) {
        const funcionario = await this.funcionarioService.update(id, funcionarioData);
        const { senha, ...funcionarioSemSenha } = funcionario.toJSON();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Funcionário atualizado com sucesso',
            data: funcionarioSemSenha,
        };
    }
    async remove(id) {
        await this.funcionarioService.remove(id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Funcionário removido com sucesso',
        };
    }
};
exports.FuncionarioController = FuncionarioController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FuncionarioController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FuncionarioController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FuncionarioController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FuncionarioController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FuncionarioController.prototype, "remove", null);
exports.FuncionarioController = FuncionarioController = __decorate([
    (0, common_1.Controller)('funcionarios'),
    __metadata("design:paramtypes", [funcionario_service_1.FuncionarioService])
], FuncionarioController);
//# sourceMappingURL=funcionario.controller.js.map