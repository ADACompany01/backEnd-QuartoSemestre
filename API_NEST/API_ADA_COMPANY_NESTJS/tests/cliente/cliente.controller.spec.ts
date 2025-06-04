import { Test, TestingModule } from '@nestjs/testing';
import { ClienteController } from '../../src/interfaces/http/controllers/cliente.controller';
import { CreateClienteUseCase } from '../../src/application/use-cases/cliente/create-cliente.use-case';
import { ListClientesUseCase } from '../../src/application/use-cases/cliente/list-clientes.use-case';
import { GetClienteUseCase } from '../../src/application/use-cases/cliente/get-cliente.use-case';
import { GetClienteByEmailUseCase } from '../../src/application/use-cases/cliente/get-cliente-by-email.use-case';
import { UpdateClienteUseCase } from '../../src/application/use-cases/cliente/update-cliente.use-case';
import { DeleteClienteUseCase } from '../../src/application/use-cases/cliente/delete-cliente.use-case';
import { FuncionarioGuard } from '../../src/interfaces/http/guards/funcionario.guard';
import { FUNCIONARIO_REPOSITORY } from '../../src/infrastructure/providers/funcionario.provider';
import { HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

describe('ClienteController', () => {
  let controller: ClienteController;
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

  const mockFuncionarioRepository = {
    findByEmail: jest.fn().mockResolvedValue({ id: uuidv4(), email: 'funcionario@test.com' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteController],
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
        {
          provide: FUNCIONARIO_REPOSITORY,
          useValue: mockFuncionarioRepository,
        },
      ],
    })
    .overrideGuard(FuncionarioGuard)
    .useValue({ canActivate: () => true })
    .compile();

    controller = module.get<ClienteController>(ClienteController);
    createClienteUseCase = module.get<CreateClienteUseCase>(CreateClienteUseCase);
    listClientesUseCase = module.get<ListClientesUseCase>(ListClientesUseCase);
    getClienteUseCase = module.get<GetClienteUseCase>(GetClienteUseCase);
    getClienteByEmailUseCase = module.get<GetClienteByEmailUseCase>(GetClienteByEmailUseCase);
    updateClienteUseCase = module.get<UpdateClienteUseCase>(UpdateClienteUseCase);
    deleteClienteUseCase = module.get<DeleteClienteUseCase>(DeleteClienteUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
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

      const result = await controller.cadastro(createClienteDto);

      expect(result).toEqual({
        id_cliente: mockCliente.id_cliente,
        nome_completo: mockCliente.nome_completo,
        email: mockCliente.email,
        cnpj: mockCliente.cnpj,
        telefone: mockCliente.telefone,
        id_usuario: mockCliente.id_usuario,
        createdAt: mockCliente.createdAt,
        updatedAt: mockCliente.updatedAt,
      });
      expect(mockCreateClienteUseCase.execute).toHaveBeenCalledWith(createClienteDto);
    });
  });

  describe('findAll', () => {
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

      const result = await controller.findAll();

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Clientes encontrados com sucesso',
        data: mockClientes.map(cliente => ({
          id_cliente: cliente.id_cliente,
          nome_completo: cliente.nome_completo,
          email: cliente.email,
          cnpj: cliente.cnpj,
          telefone: cliente.telefone,
          id_usuario: cliente.id_usuario,
          createdAt: cliente.createdAt,
          updatedAt: cliente.updatedAt,
        })),
      });
      expect(mockListClientesUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
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

      const result = await controller.findOne(mockCliente.id_cliente);

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Cliente encontrado com sucesso',
        data: {
          id_cliente: mockCliente.id_cliente,
          nome_completo: mockCliente.nome_completo,
          email: mockCliente.email,
          cnpj: mockCliente.cnpj,
          telefone: mockCliente.telefone,
          id_usuario: mockCliente.id_usuario,
          createdAt: mockCliente.createdAt,
          updatedAt: mockCliente.updatedAt,
        },
      });
      expect(mockGetClienteUseCase.execute).toHaveBeenCalledWith(mockCliente.id_cliente);
    });
  });

  describe('update', () => {
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

      const result = await controller.update(mockUpdatedCliente.id_cliente, updateClienteDto);

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Cliente atualizado com sucesso',
        data: {
          id_cliente: mockUpdatedCliente.id_cliente,
          nome_completo: mockUpdatedCliente.nome_completo,
          email: mockUpdatedCliente.email,
          cnpj: mockUpdatedCliente.cnpj,
          telefone: mockUpdatedCliente.telefone,
          id_usuario: mockUpdatedCliente.id_usuario,
          createdAt: mockUpdatedCliente.createdAt,
          updatedAt: mockUpdatedCliente.updatedAt,
        },
      });
      expect(mockUpdateClienteUseCase.execute).toHaveBeenCalledWith(mockUpdatedCliente.id_cliente, updateClienteDto);
    });
  });

  describe('remove', () => {
    it('should delete a cliente', async () => {
      const clienteId = uuidv4();
      mockDeleteClienteUseCase.execute.mockResolvedValue(true);

      const result = await controller.remove(clienteId);

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Cliente removido com sucesso',
      });
      expect(mockDeleteClienteUseCase.execute).toHaveBeenCalledWith(clienteId);
    });
  });
});
