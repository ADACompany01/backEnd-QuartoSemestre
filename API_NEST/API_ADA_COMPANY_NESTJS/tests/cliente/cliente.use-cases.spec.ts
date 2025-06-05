import { Test, TestingModule } from '@nestjs/testing';
import { CreateClienteUseCase } from '../../src/application/use-cases/cliente/create-cliente.use-case';
import { ListClientesUseCase } from '../../src/application/use-cases/cliente/list-clientes.use-case';
import { GetClienteUseCase } from '../../src/application/use-cases/cliente/get-cliente.use-case';
import { GetClienteByEmailUseCase } from '../../src/application/use-cases/cliente/get-cliente-by-email.use-case';
import { UpdateClienteUseCase } from '../../src/application/use-cases/cliente/update-cliente.use-case';
import { DeleteClienteUseCase } from '../../src/application/use-cases/cliente/delete-cliente.use-case';
import { v4 as uuidv4 } from 'uuid';

describe('Cliente Use Cases', () => {
  let createClienteUseCase: CreateClienteUseCase;
  let listClientesUseCase: ListClientesUseCase;
  let getClienteUseCase: GetClienteUseCase;
  let getClienteByEmailUseCase: GetClienteByEmailUseCase;
  let updateClienteUseCase: UpdateClienteUseCase;
  let deleteClienteUseCase: DeleteClienteUseCase;

  const mockCreateClienteUseCase = {
    execute: jest.fn(),
  };

  const mockListClientesUseCase = {
    execute: jest.fn(),
  };

  const mockGetClienteUseCase = {
    execute: jest.fn(),
  };

  const mockGetClienteByEmailUseCase = {
    execute: jest.fn(),
  };

  const mockUpdateClienteUseCase = {
    execute: jest.fn(),
  };

  const mockDeleteClienteUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CreateClienteUseCase,
          useValue: mockCreateClienteUseCase,
        },
        {
          provide: ListClientesUseCase,
          useValue: mockListClientesUseCase,
        },
        {
          provide: GetClienteUseCase,
          useValue: mockGetClienteUseCase,
        },
        {
          provide: GetClienteByEmailUseCase,
          useValue: mockGetClienteByEmailUseCase,
        },
        {
          provide: UpdateClienteUseCase,
          useValue: mockUpdateClienteUseCase,
        },
        {
          provide: DeleteClienteUseCase,
          useValue: mockDeleteClienteUseCase,
        },
      ],
    }).compile();

    createClienteUseCase = module.get<CreateClienteUseCase>(CreateClienteUseCase);
    listClientesUseCase = module.get<ListClientesUseCase>(ListClientesUseCase);
    getClienteUseCase = module.get<GetClienteUseCase>(GetClienteUseCase);
    getClienteByEmailUseCase = module.get<GetClienteByEmailUseCase>(GetClienteByEmailUseCase);
    updateClienteUseCase = module.get<UpdateClienteUseCase>(UpdateClienteUseCase);
    deleteClienteUseCase = module.get<DeleteClienteUseCase>(DeleteClienteUseCase);
  });

  it('should be defined', () => {
    expect(createClienteUseCase).toBeDefined();
    expect(listClientesUseCase).toBeDefined();
    expect(getClienteUseCase).toBeDefined();
    expect(getClienteByEmailUseCase).toBeDefined();
    expect(updateClienteUseCase).toBeDefined();
    expect(deleteClienteUseCase).toBeDefined();
  });

  describe('CreateClienteUseCase', () => {
    it('should create a new cliente', async () => {
      const createClienteDto = {
        nome_completo: 'Cliente Teste',
        email: 'cliente@email.com',
        senha: 'senha123',
        cnpj: '12345678900000',
        telefone: '11999999999',
      };

      const mockCliente = {
        id_cliente: uuidv4(),
        ...createClienteDto,
        id_usuario: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockCreateClienteUseCase.execute.mockResolvedValue(mockCliente);

      const result = await createClienteUseCase.execute(createClienteDto);

      expect(result).toEqual(mockCliente);
      expect(mockCreateClienteUseCase.execute).toHaveBeenCalledWith(createClienteDto);
    });
  });

  describe('ListClientesUseCase', () => {
    it('should return an array of clientes', async () => {
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

      mockListClientesUseCase.execute.mockResolvedValue(mockClientes);

      const result = await listClientesUseCase.execute();

      expect(result).toEqual(mockClientes);
      expect(mockListClientesUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('GetClienteUseCase', () => {
    it('should return a cliente by id', async () => {
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

      mockGetClienteUseCase.execute.mockResolvedValue(mockCliente);

      const result = await getClienteUseCase.execute(mockCliente.id_cliente);

      expect(result).toEqual(mockCliente);
      expect(mockGetClienteUseCase.execute).toHaveBeenCalledWith(mockCliente.id_cliente);
    });
  });

  describe('GetClienteByEmailUseCase', () => {
    it('should return a cliente by email', async () => {
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

      mockGetClienteByEmailUseCase.execute.mockResolvedValue(mockCliente);

      const result = await getClienteByEmailUseCase.execute('cliente@email.com');

      expect(result).toEqual(mockCliente);
      expect(mockGetClienteByEmailUseCase.execute).toHaveBeenCalledWith('cliente@email.com');
    });
  });

  describe('UpdateClienteUseCase', () => {
    it('should update a cliente', async () => {
      const updateClienteDto = {
        nome_completo: 'Cliente Atualizado',
        telefone: '11999999998',
      };

      const mockUpdatedCliente = {
        id_cliente: uuidv4(),
        nome_completo: 'Cliente Atualizado',
        email: 'cliente@email.com',
        cnpj: '12345678900000',
        telefone: '11999999998',
        id_usuario: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUpdateClienteUseCase.execute.mockResolvedValue(mockUpdatedCliente);

      const result = await updateClienteUseCase.execute(mockUpdatedCliente.id_cliente, updateClienteDto);

      expect(result).toEqual(mockUpdatedCliente);
      expect(mockUpdateClienteUseCase.execute).toHaveBeenCalledWith(mockUpdatedCliente.id_cliente, updateClienteDto);
    });
  });

  describe('DeleteClienteUseCase', () => {
    it('should delete a cliente', async () => {
      const clienteId = uuidv4();
      mockDeleteClienteUseCase.execute.mockResolvedValue(true);

      const result = await deleteClienteUseCase.execute(clienteId);

      expect(result).toBe(true);
      expect(mockDeleteClienteUseCase.execute).toHaveBeenCalledWith(clienteId);
    });
  });
}); 