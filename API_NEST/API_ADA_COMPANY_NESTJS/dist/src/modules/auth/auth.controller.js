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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const funcionario_login_dto_1 = require("./dto/funcionario-login.dto");
const cliente_login_dto_1 = require("./dto/cliente-login.dto");
const public_decorator_1 = require("./decorators/public.decorator");
const swagger_1 = require("@nestjs/swagger");
const auth_response_dto_1 = require("./dto/auth-response.dto");
class LoginDto {
}
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    getToken() {
        const token = this.authService.gerarTokenValido();
        return { token };
    }
    async loginFuncionario(loginDto) {
        return this.authService.loginFuncionario(loginDto);
    }
    async loginCliente(loginDto) {
        return this.authService.loginCliente(loginDto);
    }
    async login(loginDto) {
        return this.authService.login(loginDto.email, loginDto.senha);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Gerar token para teste' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Token gerado com sucesso',
        schema: {
            type: 'object',
            properties: {
                token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
            }
        }
    }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('token'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AuthController.prototype, "getToken", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Login de funcionário' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Login realizado com sucesso',
        type: auth_response_dto_1.AuthResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Credenciais inválidas'
    }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('login/funcionario'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [funcionario_login_dto_1.FuncionarioLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginFuncionario", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Login de cliente' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Login realizado com sucesso',
        type: auth_response_dto_1.AuthResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Credenciais inválidas'
    }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('login/cliente'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cliente_login_dto_1.ClienteLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginCliente", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Realizar login' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login realizado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Credenciais inválidas' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map