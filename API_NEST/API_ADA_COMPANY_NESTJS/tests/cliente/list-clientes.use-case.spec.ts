import { Test, TestingModule } from '@nestjs/testing';
import { ListClientesUseCase } from '../../src/application/use-cases/cliente/list-clientes.use-case';
import { CLIENTE_REPOSITORY } from '../../src/infrastructure/providers/cliente.provider';
import { v4 as uuidv4 } from 'uuid';

describe('ListClientesUseCase', () => {
  let useCase: ListClientesUseCase;
  let clienteRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListClientesUseCase,
        {
          provide: CLIENTE_REPOSITORY,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<ListClientesUseCase>(ListClientesUseCase);
    clienteRepository = module.get(CLIENTE_REPOSITORY);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return a list of clientes', async () => {
      const mockClientes = [
        {
          id_cliente: uuidv4(),
          nome_completo: 'Cliente 1',
          email: 'cliente1@email.com',
          cnpj: '12345678900001',
          telefone: '11999999999',
          id_usuario: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_cliente: uuidv4(),
          nome_completo: 'Cliente 2',
          email: 'cliente2@email.com',
          cnpj: '12345678900002',
          telefone: '11999999998',
          id_usuario: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      clienteRepository.findAll.mockResolvedValue(mockClientes);

      const result = await useCase.execute();

      expect(result).toEqual(mockClientes);
      expect(clienteRepository.findAll).toHaveBeenCalled();
    });

    it('should return an empty array when no clientes exist', async () => {
      clienteRepository.findAll.mockResolvedValue([]);

      const result = await useCase.execute();

      expect(result).toEqual([]);
      expect(clienteRepository.findAll).toHaveBeenCalled();
    });
  });
}); 