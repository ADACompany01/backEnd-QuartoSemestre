import { Test, TestingModule } from '@nestjs/testing';
import { GetClienteUseCase } from '../../src/application/use-cases/cliente/get-cliente.use-case';
import { ClienteRepositoryImpl } from '../../src/infrastructure/database/repositories/cliente.repository';

describe('GetClienteUseCase', () => {
  let useCase: GetClienteUseCase;
  let clienteRepository: ClienteRepositoryImpl;

  const mockClienteRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetClienteUseCase,
        {
          provide: ClienteRepositoryImpl,
          useValue: mockClienteRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetClienteUseCase>(GetClienteUseCase);
    clienteRepository = module.get<ClienteRepositoryImpl>(ClienteRepositoryImpl);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return a cliente when found', async () => {
      const mockCliente = {
        id_cliente: '1',
        nome_completo: 'Cliente Teste',
        email: 'cliente@email.com',
        cnpj: '12345678900000',
        telefone: '11999999999',
        id_usuario: '1',
      };

      mockClienteRepository.findOne.mockResolvedValue(mockCliente);

      const result = await useCase.execute('1');

      expect(result).toEqual(mockCliente);
      expect(mockClienteRepository.findOne).toHaveBeenCalledWith('1');
    });

    it('should return null when cliente is not found', async () => {
      mockClienteRepository.findOne.mockResolvedValue(null);

      const result = await useCase.execute('1');

      expect(result).toBeNull();
      expect(mockClienteRepository.findOne).toHaveBeenCalledWith('1');
    });
  });
}); 