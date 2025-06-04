import { Test, TestingModule } from '@nestjs/testing';
import { GetClienteByEmailUseCase } from '../../src/application/use-cases/cliente/get-cliente-by-email.use-case';
import { ClienteRepositoryImpl } from '../../src/infrastructure/database/repositories/cliente.repository';

describe('GetClienteByEmailUseCase', () => {
  let useCase: GetClienteByEmailUseCase;
  let clienteRepository: ClienteRepositoryImpl;

  const mockClienteRepository = {
    findByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetClienteByEmailUseCase,
        {
          provide: ClienteRepositoryImpl,
          useValue: mockClienteRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetClienteByEmailUseCase>(GetClienteByEmailUseCase);
    clienteRepository = module.get<ClienteRepositoryImpl>(ClienteRepositoryImpl);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return a cliente when found by email', async () => {
      const mockCliente = {
        id_cliente: '1',
        nome_completo: 'Cliente Teste',
        email: 'cliente@email.com',
        cnpj: '12345678900000',
        telefone: '11999999999',
        id_usuario: '1',
      };

      mockClienteRepository.findByEmail.mockResolvedValue(mockCliente);

      const result = await useCase.execute('cliente@email.com');

      expect(result).toEqual(mockCliente);
      expect(mockClienteRepository.findByEmail).toHaveBeenCalledWith('cliente@email.com');
    });

    it('should return null when cliente is not found by email', async () => {
      mockClienteRepository.findByEmail.mockResolvedValue(null);

      const result = await useCase.execute('cliente@email.com');

      expect(result).toBeNull();
      expect(mockClienteRepository.findByEmail).toHaveBeenCalledWith('cliente@email.com');
    });
  });
}); 