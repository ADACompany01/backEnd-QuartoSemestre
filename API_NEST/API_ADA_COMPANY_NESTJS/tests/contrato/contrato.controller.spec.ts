import { Test, TestingModule } from '@nestjs/testing';
import { ContratoController } from '../../src/interfaces/http/controllers/contrato.controller';
import { CreateContratoUseCase } from '../../src/application/use-cases/contrato/create-contrato.use-case';
import { ListContratosUseCase } from '../../src/application/use-cases/contrato/list-contratos.use-case';
import { GetContratoUseCase } from '../../src/application/use-cases/contrato/get-contrato.use-case';
import { UpdateContratoUseCase } from '../../src/application/use-cases/contrato/update-contrato.use-case';
import { DeleteContratoUseCase } from '../../src/application/use-cases/contrato/delete-contrato.use-case';
import { StatusContrato } from '../../src/infrastructure/database/entities/contrato.entity';
import { HttpStatus, HttpException, ConflictException, NotFoundException } from '@nestjs/common';

describe('ContratoController', () => {
  let controller: ContratoController;
  let createContratoUseCase: CreateContratoUseCase;
  let listContratosUseCase: ListContratosUseCase;
  let getContratoUseCase: GetContratoUseCase;
  let updateContratoUseCase: UpdateContratoUseCase;
  let deleteContratoUseCase: DeleteContratoUseCase;

  const mockCreateContratoUseCase = {
    execute: jest.fn(),
  };

  const mockListContratosUseCase = {
    execute: jest.fn(),
  };

  const mockGetContratoUseCase = {
    execute: jest.fn(),
  };

  const mockUpdateContratoUseCase = {
    execute: jest.fn(),
  };

  const mockDeleteContratoUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContratoController],
      providers: [
        {
          provide: CreateContratoUseCase,
          useValue: mockCreateContratoUseCase,
        },
        {
          provide: ListContratosUseCase,
          useValue: mockListContratosUseCase,
        },
        {
          provide: GetContratoUseCase,
          useValue: mockGetContratoUseCase,
        },
        {
          provide: UpdateContratoUseCase,
          useValue: mockUpdateContratoUseCase,
        },
        {
          provide: DeleteContratoUseCase,
          useValue: mockDeleteContratoUseCase,
        },
      ],
    }).compile();

    controller = module.get<ContratoController>(ContratoController);
    createContratoUseCase = module.get<CreateContratoUseCase>(CreateContratoUseCase);
    listContratosUseCase = module.get<ListContratosUseCase>(ListContratosUseCase);
    getContratoUseCase = module.get<GetContratoUseCase>(GetContratoUseCase);
    updateContratoUseCase = module.get<UpdateContratoUseCase>(UpdateContratoUseCase);
    deleteContratoUseCase = module.get<DeleteContratoUseCase>(DeleteContratoUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new contrato', async () => {
      const createContratoDto = {
        id_cliente: '1',
        valor_contrato: 5000.00,
        cod_orcamento: '1',
        status_contrato: StatusContrato.EM_ANALISE,
        data_inicio: new Date().toISOString(),
        data_entrega: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 dias depois
      };

      const mockContrato = {
        id_contrato: '1',
        ...createContratoDto,
        cliente: {
          id_cliente: '1',
          nome_completo: 'Cliente Teste',
        },
        orcamento: {
          cod_orcamento: '1',
          valor_orcamento: 5000.00,
        },
      };

      mockCreateContratoUseCase.execute.mockResolvedValue(mockContrato);

      const result = await controller.create(createContratoDto);

      expect(result).toEqual({
        id_contrato: mockContrato.id_contrato,
        id_cliente: mockContrato.id_cliente,
        valor_contrato: mockContrato.valor_contrato,
        cod_orcamento: mockContrato.cod_orcamento,
        status_contrato: mockContrato.status_contrato,
        data_inicio: mockContrato.data_inicio,
        data_entrega: mockContrato.data_entrega,
        cliente: mockContrato.cliente,
        orcamento: mockContrato.orcamento,
      });
      expect(mockCreateContratoUseCase.execute).toHaveBeenCalledWith(createContratoDto);
    });

    it('should handle ConflictException when creating contrato', async () => {
      const createContratoDto = {
        id_cliente: '1',
        valor_contrato: 5000.00,
        cod_orcamento: '1',
        status_contrato: StatusContrato.EM_ANALISE,
        data_inicio: new Date().toISOString(),
        data_entrega: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };

      const error = new ConflictException('Já existe um contrato para este orçamento');
      mockCreateContratoUseCase.execute.mockRejectedValue(error);

      await expect(controller.create(createContratoDto)).rejects.toThrow(HttpException);
    });
  });

  describe('findAll', () => {
    it('should return an array of contratos', async () => {
      const mockContratos = [
        {
          id_contrato: '1',
          id_cliente: '1',
          valor_contrato: 5000.00,
          cod_orcamento: '1',
          status_contrato: StatusContrato.EM_ANALISE,
          data_inicio: new Date(),
          data_entrega: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          cliente: {
            id_cliente: '1',
            nome_completo: 'Cliente 1',
          },
          orcamento: {
            cod_orcamento: '1',
            valor_orcamento: 5000.00,
          },
        },
        {
          id_contrato: '2',
          id_cliente: '2',
          valor_contrato: 7500.00,
          cod_orcamento: '2',
          status_contrato: StatusContrato.EM_ANDAMENTO,
          data_inicio: new Date(),
          data_entrega: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
          cliente: {
            id_cliente: '2',
            nome_completo: 'Cliente 2',
          },
          orcamento: {
            cod_orcamento: '2',
            valor_orcamento: 7500.00,
          },
        },
      ];

      mockListContratosUseCase.execute.mockResolvedValue(mockContratos);

      const result = await controller.findAll();

      expect(result).toEqual(mockContratos.map(contrato => ({
        id_contrato: contrato.id_contrato,
        id_cliente: contrato.id_cliente,
        valor_contrato: contrato.valor_contrato,
        cod_orcamento: contrato.cod_orcamento,
        status_contrato: contrato.status_contrato,
        data_inicio: contrato.data_inicio,
        data_entrega: contrato.data_entrega,
        cliente: contrato.cliente,
        orcamento: contrato.orcamento,
      })));
      expect(mockListContratosUseCase.execute).toHaveBeenCalled();
    });

    it('should handle error when listing contratos', async () => {
      const error = new Error('Erro ao listar contratos');
      mockListContratosUseCase.execute.mockRejectedValue(error);

      await expect(controller.findAll()).rejects.toThrow(HttpException);
    });
  });

  describe('findOne', () => {
    it('should return a single contrato', async () => {
      const mockContrato = {
        id_contrato: '1',
        id_cliente: '1',
        valor_contrato: 5000.00,
        cod_orcamento: '1',
        status_contrato: StatusContrato.EM_ANALISE,
        data_inicio: new Date(),
        data_entrega: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        cliente: {
          id_cliente: '1',
          nome_completo: 'Cliente Teste',
        },
        orcamento: {
          cod_orcamento: '1',
          valor_orcamento: 5000.00,
        },
      };

      mockGetContratoUseCase.execute.mockResolvedValue(mockContrato);

      const result = await controller.findOne('1');

      expect(result).toEqual({
        id_contrato: mockContrato.id_contrato,
        id_cliente: mockContrato.id_cliente,
        valor_contrato: mockContrato.valor_contrato,
        cod_orcamento: mockContrato.cod_orcamento,
        status_contrato: mockContrato.status_contrato,
        data_inicio: mockContrato.data_inicio,
        data_entrega: mockContrato.data_entrega,
        cliente: mockContrato.cliente,
        orcamento: mockContrato.orcamento,
      });
      expect(mockGetContratoUseCase.execute).toHaveBeenCalledWith('1');
    });

    it('should throw error when contrato is not found', async () => {
      mockGetContratoUseCase.execute.mockResolvedValue(null);

      await expect(controller.findOne('1')).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update a contrato', async () => {
      const updateContratoDto = {
        status_contrato: StatusContrato.EM_ANDAMENTO,
        data_entrega: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 dias
      };

      const mockUpdatedContrato = {
        id_contrato: '1',
        id_cliente: '1',
        valor_contrato: 5000.00,
        cod_orcamento: '1',
        status_contrato: StatusContrato.EM_ANDAMENTO,
        data_inicio: new Date(),
        data_entrega: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        cliente: {
          id_cliente: '1',
          nome_completo: 'Cliente Teste',
        },
        orcamento: {
          cod_orcamento: '1',
          valor_orcamento: 5000.00,
        },
      };

      mockUpdateContratoUseCase.execute.mockResolvedValue(mockUpdatedContrato);

      const result = await controller.update('1', updateContratoDto);

      expect(result).toEqual({
        id_contrato: mockUpdatedContrato.id_contrato,
        id_cliente: mockUpdatedContrato.id_cliente,
        valor_contrato: mockUpdatedContrato.valor_contrato,
        cod_orcamento: mockUpdatedContrato.cod_orcamento,
        status_contrato: mockUpdatedContrato.status_contrato,
        data_inicio: mockUpdatedContrato.data_inicio,
        data_entrega: mockUpdatedContrato.data_entrega,
        cliente: mockUpdatedContrato.cliente,
        orcamento: mockUpdatedContrato.orcamento,
      });
      expect(mockUpdateContratoUseCase.execute).toHaveBeenCalledWith('1', updateContratoDto);
    });

    it('should throw error when contrato to update is not found', async () => {
      const updateContratoDto = {
        status_contrato: StatusContrato.EM_ANDAMENTO,
        data_entrega: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      };

      mockUpdateContratoUseCase.execute.mockRejectedValue(new NotFoundException('Contrato não encontrado'));

      await expect(controller.update('1', updateContratoDto)).rejects.toThrow(HttpException);
    });
  });

  describe('remove', () => {
    it('should delete a contrato', async () => {
      mockDeleteContratoUseCase.execute.mockResolvedValue(1);

      const result = await controller.remove('1');

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Contrato removido com sucesso',
      });
      expect(mockDeleteContratoUseCase.execute).toHaveBeenCalledWith('1');
    });

    it('should throw error when contrato to delete is not found', async () => {
      mockDeleteContratoUseCase.execute.mockRejectedValue(new NotFoundException('Contrato não encontrado'));

      await expect(controller.remove('1')).rejects.toThrow(HttpException);
    });
  });
}); 