import { CreateClienteUseCase } from './create-cliente.use-case';
import { HttpException } from '@nestjs/common';

const mockClienteRepository = {
  create: jest.fn(),
  findById: jest.fn(),
};

const mockUsuarioRepository = {
  findByEmail: jest.fn(),
  create: jest.fn(),
};

describe('CreateClienteUseCase', () => {
  let useCase: CreateClienteUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new CreateClienteUseCase(
      mockClienteRepository as any,
      mockUsuarioRepository as any,
    );
  });

  it('deve criar um cliente com sucesso', async () => {
    mockUsuarioRepository.findByEmail.mockResolvedValue(null);
    mockUsuarioRepository.create.mockResolvedValue({ id_usuario: 'user-1' });
    mockClienteRepository.create.mockResolvedValue({ id_cliente: 'cliente-1' });
    mockClienteRepository.findById.mockResolvedValue({ id_cliente: 'cliente-1', nome_completo: 'Cliente Teste' });

    const dto = {
      nome_completo: 'Cliente Teste',
      email: 'cliente@teste.com',
      senha: 'senha123',
      telefone: '11999999999',
      cnpj: '12345678901234',
    };

    const result = await useCase.execute(dto as any);
    expect(result).toEqual({ id_cliente: 'cliente-1', nome_completo: 'Cliente Teste' });
    expect(mockUsuarioRepository.create).toHaveBeenCalled();
    expect(mockClienteRepository.create).toHaveBeenCalled();
  });

  it('deve lançar erro se o email já estiver cadastrado', async () => {
    mockUsuarioRepository.findByEmail.mockResolvedValue({ id_usuario: 'user-1' });

    const dto = {
      nome_completo: 'Cliente Teste',
      email: 'cliente@teste.com',
      senha: 'senha123',
      telefone: '11999999999',
      cnpj: '12345678901234',
    };

    await expect(useCase.execute(dto as any)).rejects.toThrow(HttpException);
    expect(mockUsuarioRepository.create).not.toHaveBeenCalled();
    expect(mockClienteRepository.create).not.toHaveBeenCalled();
  });
}); 