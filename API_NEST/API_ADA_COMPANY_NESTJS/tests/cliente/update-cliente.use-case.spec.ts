import { Test, TestingModule } from '@nestjs/testing';
import { UpdateClienteUseCase } from '../../src/application/use-cases/cliente/update-cliente.use-case';
import { ClienteRepositoryImpl } from '../../src/infrastructure/database/repositories/cliente.repository';

describe('UpdateClienteUseCase', () => {
  let useCase: UpdateClienteUseCase;
  let clienteRepository: ClienteRepositoryImpl;

  const mockClienteRepository = {
    update: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateClienteUseCase,
        {
          provide: ClienteRepositoryImpl,
          useValue: mockClienteRepository,
        },
      ],
    }).compile();

    useCase = module.get<UpdateClienteUseCase>(UpdateClienteUseCase);
    clienteRepository = module.get<ClienteRepositoryImpl>(ClienteRepositoryImpl);
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

      mockClienteRepository.findOne.mockResolvedValue(mockCliente);
      mockClienteRepository.update.mockResolvedValue([1, [mockUpdatedCliente]]);

      const result = await useCase.execute('1', updateClienteDto);

      expect(result).toEqual(mockUpdatedCliente);
      expect(mockClienteRepository.findOne).toHaveBeenCalledWith('1');
      expect(mockClienteRepository.update).toHaveBeenCalledWith('1', updateClienteDto);
    });

    it('should throw an error when cliente is not found', async () => {
      const updateClienteDto = {
        nome_completo: 'Cliente Atualizado',
        telefone: '11999999998',
      };

      mockClienteRepository.findOne.mockResolvedValue(null);

      await expect(useCase.execute('1', updateClienteDto)).rejects.toThrow('Cliente não encontrado');
      expect(mockClienteRepository.findOne).toHaveBeenCalledWith('1');
      expect(mockClienteRepository.update).not.toHaveBeenCalled();
    });
  });
}); 