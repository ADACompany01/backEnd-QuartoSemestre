"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ClienteService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const cliente_entity_1 = require("../../database/entities/cliente.entity");
const usuario_entity_1 = require("../../database/entities/usuario.entity");
const bcrypt = __importStar(require("bcrypt"));
let ClienteService = ClienteService_1 = class ClienteService {
    constructor(clienteModel, usuarioModel) {
        this.clienteModel = clienteModel;
        this.usuarioModel = usuarioModel;
        this.logger = new common_1.Logger(ClienteService_1.name);
    }
    async findAll() {
        return this.clienteModel.findAll({
            include: [usuario_entity_1.Usuario]
        });
    }
    async findOne(id) {
        const cliente = await this.clienteModel.findByPk(id, {
            include: [usuario_entity_1.Usuario]
        });
        if (!cliente) {
            throw new common_1.NotFoundException(`Cliente com ID ${id} não encontrado`);
        }
        return cliente;
    }
    async findByEmail(email) {
        const cliente = await this.clienteModel.findOne({
            where: { email },
            include: [usuario_entity_1.Usuario]
        });
        if (!cliente) {
            throw new common_1.NotFoundException(`Cliente com email ${email} não encontrado`);
        }
        return cliente;
    }
    async findByEmailWithoutException(email) {
        return this.clienteModel.findOne({
            where: { email },
            include: [usuario_entity_1.Usuario]
        });
    }
    async create(clienteData) {
        try {
            const existingByEmail = await this.clienteModel.findOne({
                where: { email: clienteData.email }
            });
            if (existingByEmail) {
                throw new common_1.ConflictException(`Cliente com email ${clienteData.email} já existe`);
            }
            if (clienteData.cnpj) {
                const existingByCnpj = await this.clienteModel.findOne({
                    where: { cnpj: clienteData.cnpj }
                });
                if (existingByCnpj) {
                    throw new common_1.ConflictException(`Cliente com CNPJ ${clienteData.cnpj} já existe`);
                }
            }
            const cliente = await this.clienteModel.create(clienteData);
            return this.findOne(cliente.id_cliente);
        }
        catch (error) {
            this.logger.error(`Erro ao criar cliente: ${error.message}`, error.stack);
            throw error;
        }
    }
    async update(id, clienteData) {
        try {
            const cliente = await this.findOne(id);
            if (clienteData.email && clienteData.email !== cliente.email) {
                const existingByEmail = await this.clienteModel.findOne({
                    where: { email: clienteData.email }
                });
                if (existingByEmail) {
                    throw new common_1.ConflictException(`Cliente com email ${clienteData.email} já existe`);
                }
            }
            if (clienteData.cnpj && clienteData.cnpj !== cliente.cnpj) {
                const existingByCnpj = await this.clienteModel.findOne({
                    where: { cnpj: clienteData.cnpj }
                });
                if (existingByCnpj) {
                    throw new common_1.ConflictException(`Cliente com CNPJ ${clienteData.cnpj} já existe`);
                }
            }
            await cliente.update(clienteData);
            return this.findOne(id);
        }
        catch (error) {
            this.logger.error(`Erro ao atualizar cliente: ${error.message}`, error.stack);
            throw error;
        }
    }
    async remove(id) {
        try {
            const cliente = await this.findOne(id);
            await cliente.destroy();
        }
        catch (error) {
            this.logger.error(`Erro ao remover cliente: ${error.message}`, error.stack);
            throw error;
        }
    }
    async cadastro(createClienteDto) {
        try {
            const existingCliente = await this.findByEmailWithoutException(createClienteDto.email);
            if (existingCliente) {
                throw new common_1.ConflictException('Email já cadastrado no sistema');
            }
            const hashedPassword = await bcrypt.hash(createClienteDto.senha, 10);
            const usuario = await this.usuarioModel.create({
                email: createClienteDto.email,
                senha: hashedPassword,
                nome_completo: createClienteDto.nome_completo,
                telefone: createClienteDto.telefone
            });
            const cliente = await this.clienteModel.create({
                ...createClienteDto,
                id_usuario: usuario.id_usuario
            });
            return this.findOne(cliente.id_cliente);
        }
        catch (error) {
            this.logger.error(`Erro ao cadastrar cliente: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.ClienteService = ClienteService;
exports.ClienteService = ClienteService = ClienteService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(cliente_entity_1.Cliente)),
    __param(1, (0, sequelize_1.InjectModel)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [Object, Object])
], ClienteService);
//# sourceMappingURL=cliente.service.js.map