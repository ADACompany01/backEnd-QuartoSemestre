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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const funcionario_service_1 = require("../funcionario/funcionario.service");
let AuthService = class AuthService {
    constructor(jwtService, configService, funcionarioService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.funcionarioService = funcionarioService;
    }
    gerarTokenValido() {
        const payload = { id: '123', role: 'admin' };
        const secret = this.configService.get('JWT_SECRET') || 'ada_company_secret_key_2025';
        return this.jwtService.sign(payload, {
            secret: secret,
            expiresIn: '1h',
        });
    }
    async loginFuncionario(loginDto) {
        const funcionario = await this.funcionarioService.findByEmail(loginDto.email);
        if (!funcionario) {
            throw new common_1.UnauthorizedException('Email ou senha inválidos');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.senha, funcionario.senha);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Email ou senha inválidos');
        }
        const payload = {
            id: funcionario.id,
            email: funcionario.email,
            nome: funcionario.nome,
            role: 'funcionario',
            cargo: funcionario.cargo
        };
        const secret = this.configService.get('JWT_SECRET') || 'ada_company_secret_key_2025';
        return {
            access_token: this.jwtService.sign(payload, {
                secret: secret,
                expiresIn: '1h',
            }),
            funcionario: {
                id: funcionario.id,
                nome: funcionario.nome,
                email: funcionario.email,
                cargo: funcionario.cargo
            }
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        funcionario_service_1.FuncionarioService])
], AuthService);
//# sourceMappingURL=auth.service.js.map