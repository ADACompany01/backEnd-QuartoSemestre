import { Test, TestingModule } from '@nestjs/testing';
import { DeleteClienteUseCase } from '../../src/application/use-cases/cliente/delete-cliente.use-case';
import { ClienteRepositoryImpl } from '../../src/infrastructure/database/repositories/cliente.repository';

describe('DeleteClienteUseCase', () => {
  let useCase: DeleteClienteUseCase;
  let clienteRepository: ClienteRepositoryImpl;

  const mockClienteRepository = {
    delete: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteClienteUseCase,
        {
          provide: ClienteRepositoryImpl,
          useValue: mockClienteRepository,
        },
      ],
    }).compile();

    useCase = module.get<DeleteClienteUseCase>(DeleteClienteUseCase);
    clienteRepository = module.get<ClienteRepositoryImpl>(ClienteRepositoryImpl);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should delete a cliente successfully', async () => {
      const mockCliente = {
        id_cliente: '1',
        nome_completo: 'Cliente Teste',
        email: 'cliente@email.com',
        cnpj: '12345678900000',
        telefone: '11999999999',
        id_usuario: '1',
      };

      mockClienteRepository.findOne.mockResolvedValue(mockCliente);
      mockClienteRepository.delete.mockResolvedValue(1);

      const result = await useCase.execute('1');

      expect(result).toBe(true);
      expect(mockClienteRepository.findOne).toHaveBeenCalledWith('1');
      expect(mockClienteRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw an error when cliente is not found', async () => {
      mockClienteRepository.findOne.mockResolvedValue(null);

      await expect(useCase.execute('1')).rejects.toThrow('Cliente não encontrado');
      expect(mockClienteRepository.findOne).toHaveBeenCalledWith('1');
      expect(mockClienteRepository.delete).not.toHaveBeenCalled();
    });
  });
}); 