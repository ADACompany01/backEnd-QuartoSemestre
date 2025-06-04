import { Test, TestingModule } from '@nestjs/testing';
import { PacoteController } from '../../src/interfaces/http/controllers/pacote.controller';
import { CreatePacoteUseCase } from '../../src/application/use-cases/pacote/create-pacote.use-case';
import { ListPacotesUseCase } from '../../src/application/use-cases/pacote/list-pacotes.use-case';
import { GetPacoteUseCase } from '../../src/application/use-cases/pacote/get-pacote.use-case';
import { UpdatePacoteUseCase } from '../../src/application/use-cases/pacote/update-pacote.use-case';
import { DeletePacoteUseCase } from '../../src/application/use-cases/pacote/delete-pacote.use-case';
import { TipoPacote } from '../../src/infrastructure/database/entities/pacote.entity';

describe('PacoteController', () => {
  let controller: PacoteController;
  let createPacoteUseCase: CreatePacoteUseCase;
  let listPacotesUseCase: ListPacotesUseCase;
  let getPacoteUseCase: GetPacoteUseCase;
  let updatePacoteUseCase: UpdatePacoteUseCase;
  let deletePacoteUseCase: DeletePacoteUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PacoteController],
      providers: [
        {
          provide: CreatePacoteUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: ListPacotesUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetPacoteUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdatePacoteUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeletePacoteUseCase,
          useValue: {
            execute: jest.fn(),
          },
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
      const pacoteData = {
        id_cliente: '1',
        tipo_pacote: TipoPacote.A,
        valor_base: 1000.00,
      };

      const expectedPacote = {
        id_pacote: '1',
        ...pacoteData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(createPacoteUseCase, 'execute').mockResolvedValue(expectedPacote);

      const result = await controller.create(pacoteData);

      expect(result).toEqual(expectedPacote);
      expect(createPacoteUseCase.execute).toHaveBeenCalledWith(pacoteData);
    });
  });

  describe('findAll', () => {
    it('should return an array of pacotes', async () => {
      const expectedPacotes = [
        {
          id_pacote: '1',
          id_cliente: '1',
          tipo_pacote: TipoPacote.A,
          valor_base: 1000.00,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_pacote: '2',
          id_cliente: '2',
          tipo_pacote: TipoPacote.AA,
          valor_base: 2000.00,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(listPacotesUseCase, 'execute').mockResolvedValue(expectedPacotes);

      const result = await controller.findAll();

      expect(result).toEqual(expectedPacotes);
      expect(listPacotesUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single pacote', async () => {
      const expectedPacote = {
        id_pacote: '1',
        id_cliente: '1',
        tipo_pacote: TipoPacote.A,
        valor_base: 1000.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(getPacoteUseCase, 'execute').mockResolvedValue(expectedPacote);

      const result = await controller.findOne('1');

      expect(result).toEqual(expectedPacote);
      expect(getPacoteUseCase.execute).toHaveBeenCalledWith('1');
    });
  });
}); 