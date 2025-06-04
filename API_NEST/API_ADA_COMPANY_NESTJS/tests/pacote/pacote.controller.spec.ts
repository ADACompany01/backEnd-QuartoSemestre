import { Test, TestingModule } from '@nestjs/testing';
import { PacoteController } from '../../src/interfaces/http/controllers/pacote.controller';
import { CreatePacoteUseCase } from '../../src/application/use-cases/pacote/create-pacote.use-case';
import { ListPacotesUseCase } from '../../src/application/use-cases/pacote/list-pacotes.use-case';
import { GetPacoteUseCase } from '../../src/application/use-cases/pacote/get-pacote.use-case';
import { UpdatePacoteUseCase } from '../../src/application/use-cases/pacote/update-pacote.use-case';
import { DeletePacoteUseCase } from '../../src/application/use-cases/pacote/delete-pacote.use-case';
import { TipoPacote } from '../../src/infrastructure/database/entities/pacote.entity';
import { HttpStatus } from '@nestjs/common';

describe('PacoteController', () => {
  let controller: PacoteController;
  let createPacoteUseCase: CreatePacoteUseCase;
  let listPacotesUseCase: ListPacotesUseCase;
  let getPacoteUseCase: GetPacoteUseCase;
  let updatePacoteUseCase: UpdatePacoteUseCase;
  let deletePacoteUseCase: DeletePacoteUseCase;

  const mockCreatePacoteUseCase = {
    execute: jest.fn(),
  };

  const mockListPacotesUseCase = {
    execute: jest.fn(),
  };

  const mockGetPacoteUseCase = {
    execute: jest.fn(),
  };

  const mockUpdatePacoteUseCase = {
    execute: jest.fn(),
  };

  const mockDeletePacoteUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PacoteController],
      providers: [
        {
          provide: CreatePacoteUseCase,
          useValue: mockCreatePacoteUseCase,
        },
        {
          provide: ListPacotesUseCase,
          useValue: mockListPacotesUseCase,
        },
        {
          provide: GetPacoteUseCase,
          useValue: mockGetPacoteUseCase,
        },
        {
          provide: UpdatePacoteUseCase,
          useValue: mockUpdatePacoteUseCase,
        },
        {
          provide: DeletePacoteUseCase,
          useValue: mockDeletePacoteUseCase,
        },
      ],
    }).compile();

    controller = module.get<PacoteController>(PacoteController);
    createPacoteUseCase = module.get<CreatePacoteUseCase>(CreatePacoteUseCase);
    listPacotesUseCase = module.get<ListPacotesUseCase>(ListPacotesUseCase);
    getPacoteUseCase = module.get<GetPacoteUseCase>(GetPacoteUseCase);
    updatePacoteUseCase = module.get<UpdatePacoteUseCase>(UpdatePacoteUseCase);
    deletePacoteUseCase = module.get<DeletePacoteUseCase>(DeletePacoteUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new pacote', async () => {
      const createPacoteDto = {
        id_cliente: '1',
        tipo_pacote: TipoPacote.A,
        valor_base: 1000.00,
      };

      const mockPacote = {
        id_pacote: '1',
        ...createPacoteDto,
      };

      mockCreatePacoteUseCase.execute.mockResolvedValue(mockPacote);

      const result = await controller.create(createPacoteDto);

      expect(result).toEqual({
        statusCode: HttpStatus.CREATED,
        message: 'Pacote criado com sucesso',
        data: mockPacote,
      });
      expect(mockCreatePacoteUseCase.execute).toHaveBeenCalledWith(createPacoteDto);
    });

    it('should handle error when creating pacote', async () => {
      const createPacoteDto = {
        id_cliente: '1',
        tipo_pacote: TipoPacote.A,
        valor_base: 1000.00,
      };

      const error = new Error('Erro ao criar pacote');
      mockCreatePacoteUseCase.execute.mockRejectedValue(error);

      await expect(controller.create(createPacoteDto)).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return an array of pacotes', async () => {
      const mockPacotes = [
        {
          id_pacote: '1',
          id_cliente: '1',
          tipo_pacote: TipoPacote.A,
          valor_base: 1000.00,
        },
        {
          id_pacote: '2',
          id_cliente: '2',
          tipo_pacote: TipoPacote.AA,
          valor_base: 2000.00,
        },
      ];

      mockListPacotesUseCase.execute.mockResolvedValue(mockPacotes);

      const result = await controller.findAll();

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Pacotes encontrados com sucesso',
        data: mockPacotes,
      });
      expect(mockListPacotesUseCase.execute).toHaveBeenCalled();
    });

    it('should handle error when listing pacotes', async () => {
      const error = new Error('Erro ao listar pacotes');
      mockListPacotesUseCase.execute.mockRejectedValue(error);

      await expect(controller.findAll()).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('should return a single pacote', async () => {
      const mockPacote = {
        id_pacote: '1',
        id_cliente: '1',
        tipo_pacote: TipoPacote.A,
        valor_base: 1000.00,
      };

      mockGetPacoteUseCase.execute.mockResolvedValue(mockPacote);

      const result = await controller.findOne('1');

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Pacote encontrado com sucesso',
        data: mockPacote,
      });
      expect(mockGetPacoteUseCase.execute).toHaveBeenCalledWith('1');
    });

    it('should throw error when pacote is not found', async () => {
      mockGetPacoteUseCase.execute.mockResolvedValue(null);

      await expect(controller.findOne('1')).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a pacote', async () => {
      const updatePacoteDto = {
        tipo_pacote: TipoPacote.AA,
        valor_base: 2000.00,
      };

      const mockUpdatedPacote = {
        id_pacote: '1',
        id_cliente: '1',
        ...updatePacoteDto,
      };

      mockUpdatePacoteUseCase.execute.mockResolvedValue(mockUpdatedPacote);

      const result = await controller.update('1', updatePacoteDto);

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Pacote atualizado com sucesso',
        data: mockUpdatedPacote,
      });
      expect(mockUpdatePacoteUseCase.execute).toHaveBeenCalledWith('1', expect.any(Object));
    });

    it('should throw error when pacote to update is not found', async () => {
      const updatePacoteDto = {
        tipo_pacote: TipoPacote.AA,
        valor_base: 2000.00,
      };

      mockUpdatePacoteUseCase.execute.mockResolvedValue(null);

      await expect(controller.update('1', updatePacoteDto)).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should delete a pacote', async () => {
      mockDeletePacoteUseCase.execute.mockResolvedValue(1);

      const result = await controller.remove('1');

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Pacote removido com sucesso',
      });
      expect(mockDeletePacoteUseCase.execute).toHaveBeenCalledWith('1');
    });

    it('should throw error when pacote to delete is not found', async () => {
      mockDeletePacoteUseCase.execute.mockResolvedValue(0);

      await expect(controller.remove('1')).rejects.toThrow();
    });
  });
}); 