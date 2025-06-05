import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/application/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ClienteRepositoryImpl } from '../../src/infrastructure/database/repositories/cliente.repository';
import { FuncionarioRepositoryImpl } from '../../src/infrastructure/database/repositories/funcionario.repository';
import { ClienteLoginDto } from '../../src/interfaces/http/dtos/requests/cliente-login.dto';
import { FuncionarioLoginDto } from '../../src/interfaces/http/dtos/requests/funcionario-login.dto';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let clienteRepository: ClienteRepositoryImpl;
  let funcionarioRepository: FuncionarioRepositoryImpl;

  const mockJwtService = {
    sign: jest.fn(),
  };

  const mockClienteRepository = {
    findByEmail: jest.fn(),
  };

  const mockFuncionarioRepository = {
    findByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ClienteRepositoryImpl,
          useValue: mockClienteRepository,
        },
        {
          provide: FuncionarioRepositoryImpl,
          useValue: mockFuncionarioRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    clienteRepository = module.get<ClienteRepositoryImpl>(ClienteRepositoryImpl);
    funcionarioRepository = module.get<FuncionarioRepositoryImpl>(FuncionarioRepositoryImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('loginCliente', () => {
    it('should return a JWT token when credentials are valid', async () => {
      const loginDto: ClienteLoginDto = {
        email: 'cliente@email.com',
        senha: 'senha123',
      };

      const hashedPassword = await bcrypt.hash('senha123', 10);
      const mockCliente = {
        id_cliente: '1',
        email: 'cliente@email.com',
        senha: hashedPassword,
      };

      const mockToken = 'jwt-token';

      mockClienteRepository.findByEmail.mockResolvedValue(mockCliente);
      mockJwtService.sign.mockReturnValue(mockToken);

      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));

      const result = await service.loginCliente(loginDto);

      expect(result).toEqual({
        token: mockToken,
        user: {
          id: mockCliente.id_cliente,
          email: mockCliente.email,
        },
      });
      expect(mockClienteRepository.findByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(mockJwtService.sign).toHaveBeenCalled();
    });

    it('should throw an error when credentials are invalid', async () => {
      const loginDto: ClienteLoginDto = {
        email: 'cliente@email.com',
        senha: 'senha123',
      };

      mockClienteRepository.findByEmail.mockResolvedValue(null);

      await expect(service.loginCliente(loginDto)).rejects.toThrow('Credenciais inválidas');
      expect(mockClienteRepository.findByEmail).toHaveBeenCalledWith(loginDto.email);
    });
  });

  describe('loginFuncionario', () => {
    it('should return a JWT token when credentials are valid', async () => {
      const loginDto: FuncionarioLoginDto = {
        email: 'funcionario@adacompany.com',
        senha: 'senha123',
      };

      const hashedPassword = await bcrypt.hash('senha123', 10);
      const mockFuncionario = {
        id_funcionario: '1',
        email: 'funcionario@adacompany.com',
        senha: hashedPassword,
      };

      const mockToken = 'jwt-token';

      mockFuncionarioRepository.findByEmail.mockResolvedValue(mockFuncionario);
      mockJwtService.sign.mockReturnValue(mockToken);

      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));

      const result = await service.loginFuncionario(loginDto);

      expect(result).toEqual({
        token: mockToken,
        user: {
          id: mockFuncionario.id_funcionario,
          email: mockFuncionario.email,
        },
      });
      expect(mockFuncionarioRepository.findByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(mockJwtService.sign).toHaveBeenCalled();
    });

    it('should throw an error when credentials are invalid', async () => {
      const loginDto: FuncionarioLoginDto = {
        email: 'funcionario@adacompany.com',
        senha: 'senha123',
      };

      mockFuncionarioRepository.findByEmail.mockResolvedValue(null);

      await expect(service.loginFuncionario(loginDto)).rejects.toThrow('Credenciais inválidas');
      expect(mockFuncionarioRepository.findByEmail).toHaveBeenCalledWith(loginDto.email);
    });
  });

  describe('gerarTokenValido', () => {
    it('should return a valid JWT token', () => {
      const mockToken = 'jwt-token';
      mockJwtService.sign.mockReturnValue(mockToken);

      const result = service.gerarTokenValido();

      expect(result).toBe(mockToken);
      expect(mockJwtService.sign).toHaveBeenCalled();
    });
  });
}); 