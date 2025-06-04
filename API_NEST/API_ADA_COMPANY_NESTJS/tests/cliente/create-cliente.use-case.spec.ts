import { CreateClienteUseCase } from '../../src/application/use-cases/cliente/create-cliente.use-case';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

describe('CreateClienteUseCase', () => {
  let useCase: CreateClienteUseCase;
  let mockClienteRepository: any;
  let mockUsuarioRepository: any;

  beforeEach(() => {
    mockClienteRepository = {
      create: jest.fn(),
    };
    mockUsuarioRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
    };
    useCase = new CreateClienteUseCase(mockClienteRepository, mockUsuarioRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should create a new cliente successfully', async () => {
      const createClienteDto = {
        nome_completo: 'Cliente Teste',
        email: 'cliente@email.com',
        senha: 'senha123',
        cnpj: '12345678900000',
        telefone: '11999999999',
      };

      const mockUsuario = {
        id_usuario: uuidv4(),
        nome_completo: createClienteDto.nome_completo,
        email: createClienteDto.email,
        senha: await bcrypt.hash(createClienteDto.senha, 10),
        telefone: createClienteDto.telefone,
      };

      const mockCliente = {
        id_cliente: uuidv4(),
        nome_completo: createClienteDto.nome_completo,
        email: createClienteDto.email,
        cnpj: createClienteDto.cnpj,
        telefone: createClienteDto.telefone,
        id_usuario: mockUsuario.id_usuario,
      };

      mockUsuarioRepository.findByEmail.mockResolvedValue(null);
      mockUsuarioRepository.create.mockResolvedValue(mockUsuario);
      mockClienteRepository.create.mockResolvedValue(mockCliente);

      const result = await useCase.execute(createClienteDto);

      expect(result).toEqual(mockCliente);
      expect(mockUsuarioRepository.findByEmail).toHaveBeenCalledWith(createClienteDto.email);
      expect(mockUsuarioRepository.create).toHaveBeenCalledWith({
        nome_completo: createClienteDto.nome_completo,
        email: createClienteDto.email,
        senha: expect.any(String),
        telefone: createClienteDto.telefone,
      });
      expect(mockClienteRepository.create).toHaveBeenCalledWith({
        nome_completo: createClienteDto.nome_completo,
        email: createClienteDto.email,
        cnpj: createClienteDto.cnpj,
        telefone: createClienteDto.telefone,
        id_usuario: mockUsuario.id_usuario,
      });
    });

    it('should throw an error when email already exists', async () => {
      const createClienteDto = {
        nome_completo: 'Cliente Teste',
        email: 'cliente@email.com',
        senha: 'senha123',
        cnpj: '12345678900000',
        telefone: '11999999999',
      };

      mockUsuarioRepository.findByEmail.mockResolvedValue({
        id_usuario: uuidv4(),
        email: createClienteDto.email,
      });

      await expect(useCase.execute(createClienteDto)).rejects.toThrow(new HttpException('Email já cadastrado', HttpStatus.BAD_REQUEST));
      expect(mockUsuarioRepository.findByEmail).toHaveBeenCalledWith(createClienteDto.email);
      expect(mockUsuarioRepository.create).not.toHaveBeenCalled();
      expect(mockClienteRepository.create).not.toHaveBeenCalled();
    });
  });
}); 