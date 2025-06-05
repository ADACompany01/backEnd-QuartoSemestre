import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/interfaces/http/controllers/auth.controller';
import { AuthService } from '../../src/application/auth/auth.service';
import { ClienteLoginDto } from '../../src/interfaces/http/dtos/requests/cliente-login.dto';
import { FuncionarioLoginDto } from '../../src/interfaces/http/dtos/requests/funcionario-login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    loginCliente: jest.fn(),
    loginFuncionario: jest.fn(),
    gerarTokenValido: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('loginCliente', () => {
    it('should return auth response when login is successful', async () => {
      const loginDto: ClienteLoginDto = {
        email: 'cliente@email.com',
        senha: 'senha123',
      };

      const mockResponse = {
        token: 'jwt-token',
        user: {
          id_cliente: '123e4567-e89b-12d3-a456-426614174000',
          email: 'cliente@email.com',
        },
      };

      mockAuthService.loginCliente.mockResolvedValue(mockResponse);

      const result = await controller.loginCliente(loginDto);

      expect(result).toEqual(mockResponse);
      expect(mockAuthService.loginCliente).toHaveBeenCalledWith(loginDto);
    });

    it('should throw an error when login fails', async () => {
      const loginDto: ClienteLoginDto = {
        email: 'cliente@email.com',
        senha: 'senha123',
      };

      mockAuthService.loginCliente.mockRejectedValue(new Error('Credenciais inválidas'));

      await expect(controller.loginCliente(loginDto)).rejects.toThrow('Credenciais inválidas');
      expect(mockAuthService.loginCliente).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('loginFuncionario', () => {
    it('should return auth response when login is successful', async () => {
      const loginDto: FuncionarioLoginDto = {
        email: 'funcionario@adacompany.com',
        senha: 'senha123',
      };

      const mockResponse = {
        token: 'jwt-token',
        user: {
          id_funcionario: '123e4567-e89b-12d3-a456-426614174001',
          email: 'funcionario@adacompany.com',
        },
      };

      mockAuthService.loginFuncionario.mockResolvedValue(mockResponse);

      const result = await controller.loginFuncionario(loginDto);

      expect(result).toEqual(mockResponse);
      expect(mockAuthService.loginFuncionario).toHaveBeenCalledWith(loginDto);
    });

    it('should throw an error when login fails', async () => {
      const loginDto: FuncionarioLoginDto = {
        email: 'funcionario@adacompany.com',
        senha: 'senha123',
      };

      mockAuthService.loginFuncionario.mockRejectedValue(new Error('Credenciais inválidas'));

      await expect(controller.loginFuncionario(loginDto)).rejects.toThrow('Credenciais inválidas');
      expect(mockAuthService.loginFuncionario).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('getToken', () => {
    it('should return a valid JWT token', async () => {
      const mockToken = 'jwt-token';
      mockAuthService.gerarTokenValido.mockReturnValue(mockToken);

      const result = await controller.getToken();

      expect(result).toBe(mockToken);
      expect(mockAuthService.gerarTokenValido).toHaveBeenCalled();
    });
  });
});
