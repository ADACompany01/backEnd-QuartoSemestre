import { DeleteClienteUseCase } from '../../src/application/use-cases/cliente/delete-cliente.use-case';

describe('DeleteClienteUseCase', () => {
  let useCase: DeleteClienteUseCase;
  let mockClienteRepository: any;

  beforeEach(() => {
    mockClienteRepository = {
      delete: jest.fn(),
      findById: jest.fn(),
    };
    useCase = new DeleteClienteUseCase(mockClienteRepository);
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

      mockClienteRepository.findById.mockResolvedValue(mockCliente);
      mockClienteRepository.delete.mockResolvedValue(undefined);

      await useCase.execute('1');

      expect(mockClienteRepository.findById).toHaveBeenCalledWith('1');
      expect(mockClienteRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw an error when cliente is not found', async () => {
      mockClienteRepository.findById.mockResolvedValue(null);

      await expect(useCase.execute('1')).rejects.toThrow('Cliente não encontrado');
      expect(mockClienteRepository.findById).toHaveBeenCalledWith('1');
      expect(mockClienteRepository.delete).not.toHaveBeenCalled();
    });
  });
}); 