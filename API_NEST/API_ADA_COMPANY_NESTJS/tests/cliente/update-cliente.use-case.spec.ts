import { UpdateClienteUseCase } from '../../src/application/use-cases/cliente/update-cliente.use-case';

describe('UpdateClienteUseCase', () => {
  let useCase: UpdateClienteUseCase;
  let mockClienteRepository: any;

  beforeEach(() => {
    mockClienteRepository = {
      update: jest.fn(),
      findById: jest.fn(),
    };
    useCase = new UpdateClienteUseCase(mockClienteRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should update a cliente successfully', async () => {
      const updateClienteDto = {
        nome_completo: 'Cliente Atualizado',
        telefone: '11999999998',
      };

      const mockCliente = {
        id_cliente: '1',
        nome_completo: 'Cliente Teste',
        email: 'cliente@email.com',
        cnpj: '12345678900000',
        telefone: '11999999999',
        id_usuario: '1',
      };

      const mockUpdatedCliente = {
        ...mockCliente,
        ...updateClienteDto,
      };

      mockClienteRepository.findById
        .mockResolvedValueOnce(mockCliente)
        .mockResolvedValueOnce(mockUpdatedCliente);
      mockClienteRepository.update.mockResolvedValue(undefined);

      const result = await useCase.execute('1', updateClienteDto);

      expect(result).toEqual(mockUpdatedCliente);
      expect(mockClienteRepository.findById).toHaveBeenCalledWith('1');
      expect(mockClienteRepository.update).toHaveBeenCalledWith('1', updateClienteDto);
    });

    it('should throw an error when cliente is not found', async () => {
      const updateClienteDto = {
        nome_completo: 'Cliente Atualizado',
        telefone: '11999999998',
      };

      mockClienteRepository.findById.mockResolvedValue(null);

      await expect(useCase.execute('1', updateClienteDto)).rejects.toThrow('Cliente não encontrado');
      expect(mockClienteRepository.findById).toHaveBeenCalledWith('1');
      expect(mockClienteRepository.update).not.toHaveBeenCalled();
    });
  });
}); 