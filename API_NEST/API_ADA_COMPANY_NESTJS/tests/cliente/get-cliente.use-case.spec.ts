import { Test, TestingModule } from '@nestjs/testing';
import { GetClienteUseCase } from '../../src/application/use-cases/cliente/get-cliente.use-case';
import { CLIENTE_REPOSITORY } from '../../src/infrastructure/providers/cliente.provider';
import { v4 as uuidv4 } from 'uuid';

describe('GetClienteUseCase', () => {
  let useCase: GetClienteUseCase;
  let clienteRepository: any;

  const mockClienteRepository = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetClienteUseCase,
        {
          provide: CLIENTE_REPOSITORY,
          useValue: mockClienteRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetClienteUseCase>(GetClienteUseCase);
    clienteRepository = module.get(CLIENTE_REPOSITORY);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return a cliente when found', async () => {
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

      mockClienteRepository.findById.mockResolvedValue(mockCliente);

      const result = await useCase.execute(mockCliente.id_cliente);

      expect(result).toEqual(mockCliente);
      expect(clienteRepository.findById).toHaveBeenCalledWith(mockCliente.id_cliente);
    });

    it('should return null when cliente is not found', async () => {
      const id = uuidv4();
      mockClienteRepository.findById.mockResolvedValue(null);

      const result = await useCase.execute(id);

      expect(result).toBeNull();
      expect(clienteRepository.findById).toHaveBeenCalledWith(id);
    });
  });
}); 