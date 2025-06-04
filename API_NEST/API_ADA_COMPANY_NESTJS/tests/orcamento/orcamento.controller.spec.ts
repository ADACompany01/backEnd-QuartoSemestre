import { Test, TestingModule } from '@nestjs/testing';
import { OrcamentoController } from '../../src/interfaces/http/controllers/orcamento.controller';
import { CreateOrcamentoUseCase } from '../../src/application/use-cases/orcamento/create-orcamento.use-case';
import { ListOrcamentosUseCase } from '../../src/application/use-cases/orcamento/list-orcamentos.use-case';
import { GetOrcamentoUseCase } from '../../src/application/use-cases/orcamento/get-orcamento.use-case';
import { UpdateOrcamentoUseCase } from '../../src/application/use-cases/orcamento/update-orcamento.use-case';
import { DeleteOrcamentoUseCase } from '../../src/application/use-cases/orcamento/delete-orcamento.use-case';
import { HttpStatus, HttpException, NotFoundException, ConflictException } from '@nestjs/common';

describe('OrcamentoController', () => {
  let controller: OrcamentoController;
  let createOrcamentoUseCase: CreateOrcamentoUseCase;
  let listOrcamentosUseCase: ListOrcamentosUseCase;
  let getOrcamentoUseCase: GetOrcamentoUseCase;
  let updateOrcamentoUseCase: UpdateOrcamentoUseCase;
  let deleteOrcamentoUseCase: DeleteOrcamentoUseCase;

  const mockCreateOrcamentoUseCase = {
    execute: jest.fn(),
  };

  const mockListOrcamentosUseCase = {
    execute: jest.fn(),
  };

  const mockGetOrcamentoUseCase = {
    execute: jest.fn(),
  };

  const mockUpdateOrcamentoUseCase = {
    execute: jest.fn(),
  };

  const mockDeleteOrcamentoUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrcamentoController],
      providers: [
        {
          provide: CreateOrcamentoUseCase,
          useValue: mockCreateOrcamentoUseCase,
        },
        {
          provide: ListOrcamentosUseCase,
          useValue: mockListOrcamentosUseCase,
        },
        {
          provide: GetOrcamentoUseCase,
          useValue: mockGetOrcamentoUseCase,
        },
        {
          provide: UpdateOrcamentoUseCase,
          useValue: mockUpdateOrcamentoUseCase,
        },
        {
          provide: DeleteOrcamentoUseCase,
          useValue: mockDeleteOrcamentoUseCase,
        },
      ],
    }).compile();

    controller = module.get<OrcamentoController>(OrcamentoController);
    createOrcamentoUseCase = module.get<CreateOrcamentoUseCase>(CreateOrcamentoUseCase);
    listOrcamentosUseCase = module.get<ListOrcamentosUseCase>(ListOrcamentosUseCase);
    getOrcamentoUseCase = module.get<GetOrcamentoUseCase>(GetOrcamentoUseCase);
    updateOrcamentoUseCase = module.get<UpdateOrcamentoUseCase>(UpdateOrcamentoUseCase);
    deleteOrcamentoUseCase = module.get<DeleteOrcamentoUseCase>(DeleteOrcamentoUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new orcamento', async () => {
      const createOrcamentoDto = {
        valor_orcamento: 1500.00,
        data_orcamento: new Date(),
        data_validade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
        id_pacote: '1',
      };

      const mockOrcamento = {
        cod_orcamento: '1',
        ...createOrcamentoDto,
      };

      mockCreateOrcamentoUseCase.execute.mockResolvedValue(mockOrcamento);

      const result = await controller.create(createOrcamentoDto);

      expect(result).toEqual({
        statusCode: HttpStatus.CREATED,
        message: 'Orçamento criado com sucesso',
        data: mockOrcamento,
      });
      expect(mockCreateOrcamentoUseCase.execute).toHaveBeenCalledWith(createOrcamentoDto);
    });

    it('should handle NotFoundException when creating orcamento', async () => {
      const createOrcamentoDto = {
        valor_orcamento: 1500.00,
        data_orcamento: new Date(),
        data_validade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        id_pacote: '1',
      };

      const error = new NotFoundException('Pacote não encontrado');
      mockCreateOrcamentoUseCase.execute.mockRejectedValue(error);

      await expect(controller.create(createOrcamentoDto)).rejects.toThrow(HttpException);
    });

    it('should handle ConflictException when creating orcamento', async () => {
      const createOrcamentoDto = {
        valor_orcamento: 1500.00,
        data_orcamento: new Date(),
        data_validade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        id_pacote: '1',
      };

      const error = new ConflictException('Já existe orçamento para este pacote');
      mockCreateOrcamentoUseCase.execute.mockRejectedValue(error);

      await expect(controller.create(createOrcamentoDto)).rejects.toThrow(HttpException);
    });
  });

  describe('findAll', () => {
    it('should return an array of orcamentos', async () => {
      const mockOrcamentos = [
        {
          cod_orcamento: '1',
          valor_orcamento: 1500.00,
          data_orcamento: new Date(),
          data_validade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          id_pacote: '1',
        },
        {
          cod_orcamento: '2',
          valor_orcamento: 2000.00,
          data_orcamento: new Date(),
          data_validade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          id_pacote: '2',
        },
      ];

      mockListOrcamentosUseCase.execute.mockResolvedValue(mockOrcamentos);

      const result = await controller.findAll();

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Orçamentos encontrados com sucesso',
        data: mockOrcamentos,
      });
      expect(mockListOrcamentosUseCase.execute).toHaveBeenCalled();
    });

    it('should handle error when listing orcamentos', async () => {
      const error = new Error('Erro ao listar orçamentos');
      mockListOrcamentosUseCase.execute.mockRejectedValue(error);

      await expect(controller.findAll()).rejects.toThrow(HttpException);
    });
  });

  describe('findOne', () => {
    it('should return a orcamento by id', async () => {
      const mockOrcamento = {
        cod_orcamento: '1',
        valor_orcamento: 1500.00,
        data_orcamento: new Date(),
        data_validade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        id_pacote: '1',
      };

      mockGetOrcamentoUseCase.execute.mockResolvedValue(mockOrcamento);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockOrcamento);
      expect(mockGetOrcamentoUseCase.execute).toHaveBeenCalledWith('1');
    });

    it('should throw error when orcamento is not found', async () => {
      mockGetOrcamentoUseCase.execute.mockResolvedValue(null);

      await expect(controller.findOne('1')).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update a orcamento', async () => {
      const updateOrcamentoDto = {
        valor_orcamento: 2000.00,
        data_validade: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 dias
      };

      const mockUpdatedOrcamento = {
        cod_orcamento: '1',
        valor_orcamento: 2000.00,
        data_orcamento: new Date(),
        data_validade: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        id_pacote: '1',
      };

      mockUpdateOrcamentoUseCase.execute.mockResolvedValue([1, [mockUpdatedOrcamento]]);

      const result = await controller.update('1', updateOrcamentoDto);

      expect(result).toEqual(mockUpdatedOrcamento);
      expect(mockUpdateOrcamentoUseCase.execute).toHaveBeenCalledWith('1', updateOrcamentoDto);
    });

    it('should throw error when orcamento to update is not found', async () => {
      const updateOrcamentoDto = {
        valor_orcamento: 2000.00,
        data_validade: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      };

      mockUpdateOrcamentoUseCase.execute.mockResolvedValue([0, []]);

      await expect(controller.update('1', updateOrcamentoDto)).rejects.toThrow(HttpException);
    });
  });

  describe('remove', () => {
    it('should delete a orcamento', async () => {
      mockDeleteOrcamentoUseCase.execute.mockResolvedValue(1);

      const result = await controller.remove('1');

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Orçamento removido com sucesso',
      });
      expect(mockDeleteOrcamentoUseCase.execute).toHaveBeenCalledWith('1');
    });

    it('should throw error when orcamento to delete is not found', async () => {
      mockDeleteOrcamentoUseCase.execute.mockRejectedValue(new Error('Orçamento não encontrado'));

      await expect(controller.remove('1')).rejects.toThrow(HttpException);
    });
  });
});
