import { Test, TestingModule } from '@nestjs/testing';
import { ListClientesUseCase } from '../../src/application/use-cases/cliente/list-clientes.use-case';
import { ClienteRepositoryImpl } from '../../src/infrastructure/database/repositories/cliente.repository';

describe('ListClientesUseCase', () => {
  let useCase: ListClientesUseCase;
  let clienteRepository: ClienteRepositoryImpl;

  const mockClienteRepository = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListClientesUseCase,
        {
          provide: ClienteRepositoryImpl,
          useValue: mockClienteRepository,
        },
      ],
    }).compile();

    useCase = module.get<ListClientesUseCase>(ListClientesUseCase);
    clienteRepository = module.get<ClienteRepositoryImpl>(ClienteRepositoryImpl);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return a list of clientes', async () => {
      const mockClientes = [
        {
          id_cliente: '1',
          nome_completo: 'Cliente 1',
          email: 'cliente1@email.com',
          cnpj: '12345678900001',
          telefone: '11999999999',
          id_usuario: '1',
        },
        {
          id_cliente: '2',
          nome_completo: 'Cliente 2',
          email: 'cliente2@email.com',
          cnpj: '12345678900002',
          telefone: '11999999998',
          id_usuario: '2',
        },
      ];

      mockClienteRepository.findAll.mockResolvedValue(mockClientes);

      const result = await useCase.execute();

      expect(result).toEqual(mockClientes);
      expect(mockClienteRepository.findAll).toHaveBeenCalled();
    });

    it('should return an empty array when no clientes exist', async () => {
      mockClienteRepository.findAll.mockResolvedValue([]);

      const result = await useCase.execute();

      expect(result).toEqual([]);
      expect(mockClienteRepository.findAll).toHaveBeenCalled();
    });
  });
}); 