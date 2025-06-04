import { Test, TestingModule } from '@nestjs/testing';
import { CreateClienteUseCase } from '../../src/application/use-cases/cliente/create-cliente.use-case';
import { ClienteRepositoryImpl } from '../../src/infrastructure/database/repositories/cliente.repository';
import { UsuarioRepository } from '../../src/infrastructure/database/repositories/usuario.repository';
import * as bcrypt from 'bcrypt';

describe('CreateClienteUseCase', () => {
  let useCase: CreateClienteUseCase;
  let clienteRepository: ClienteRepositoryImpl;
  let usuarioRepository: UsuarioRepository;

  const mockClienteRepository = {
    create: jest.fn(),
    findByEmail: jest.fn(),
  };

  const mockUsuarioRepository = {
    create: jest.fn(),
    findByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateClienteUseCase,
        {
          provide: ClienteRepositoryImpl,
          useValue: mockClienteRepository,
        },
        {
          provide: UsuarioRepository,
          useValue: mockUsuarioRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateClienteUseCase>(CreateClienteUseCase);
    clienteRepository = module.get<ClienteRepositoryImpl>(ClienteRepositoryImpl);
    usuarioRepository = module.get<UsuarioRepository>(UsuarioRepository);
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
        id_usuario: '1',
        nome_completo: createClienteDto.nome_completo,
        email: createClienteDto.email,
        senha: await bcrypt.hash(createClienteDto.senha, 10),
        telefone: createClienteDto.telefone,
      };

      const mockCliente = {
        id_cliente: '1',
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
      expect(mockUsuarioRepository.create).toHaveBeenCalled();
      expect(mockClienteRepository.create).toHaveBeenCalled();
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
        id_usuario: '1',
        email: createClienteDto.email,
      });

      await expect(useCase.execute(createClienteDto)).rejects.toThrow('Email já cadastrado');
      expect(mockUsuarioRepository.findByEmail).toHaveBeenCalledWith(createClienteDto.email);
      expect(mockUsuarioRepository.create).not.toHaveBeenCalled();
      expect(mockClienteRepository.create).not.toHaveBeenCalled();
    });
  });
}); 