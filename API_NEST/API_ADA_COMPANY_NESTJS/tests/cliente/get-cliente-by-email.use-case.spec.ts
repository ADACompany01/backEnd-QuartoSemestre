import { Test, TestingModule } from '@nestjs/testing';
import { GetClienteByEmailUseCase } from '../../src/application/use-cases/cliente/get-cliente-by-email.use-case';
import { CLIENTE_REPOSITORY } from '../../src/infrastructure/providers/cliente.provider';
import { v4 as uuidv4 } from 'uuid';

describe('GetClienteByEmailUseCase', () => {
  let useCase: GetClienteByEmailUseCase;
  let clienteRepository: any;

  const mockClienteRepository = {
    findByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetClienteByEmailUseCase,
        {
          provide: CLIENTE_REPOSITORY,
          useValue: mockClienteRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetClienteByEmailUseCase>(GetClienteByEmailUseCase);
    clienteRepository = module.get(CLIENTE_REPOSITORY);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return a cliente when found by email', async () => {
      const mockCliente = {
        id_cliente: uuidv4(),
        nome_completo: 'Cliente Teste',
        email: 'cliente@email.com',
        cnpj: '12345678900000',
        telefone: '11999999999',
        id_usuario: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockClienteRepository.findByEmail.mockResolvedValue(mockCliente);

      const result = await useCase.execute('cliente@email.com');

      expect(result).toEqual(mockCliente);
      expect(clienteRepository.findByEmail).toHaveBeenCalledWith('cliente@email.com');
    });

    it('should return null when cliente is not found by email', async () => {
      mockClienteRepository.findByEmail.mockResolvedValue(null);

      const result = await useCase.execute('nonexistent@email.com');

      expect(result).toBeNull();
      expect(clienteRepository.findByEmail).toHaveBeenCalledWith('nonexistent@email.com');
    });
  });
}); 