import { Test, TestingModule } from '@nestjs/testing';
import { ContratoController } from '../../src/interfaces/http/controllers/contrato.controller';
import { CreateContratoUseCase } from '../../src/application/use-cases/contrato/create-contrato.use-case';
import { ListContratosUseCase } from '../../src/application/use-cases/contrato/list-contratos.use-case';
import { GetContratoUseCase } from '../../src/application/use-cases/contrato/get-contrato.use-case';
import { UpdateContratoUseCase } from '../../src/application/use-cases/contrato/update-contrato.use-case';
import { DeleteContratoUseCase } from '../../src/application/use-cases/contrato/delete-contrato.use-case';
import { StatusContrato } from '../../src/infrastructure/database/entities/contrato.entity';

describe('ContratoController', () => {
  let controller: ContratoController;
  let createContratoUseCase: CreateContratoUseCase;
  let listContratosUseCase: ListContratosUseCase;
  let getContratoUseCase: GetContratoUseCase;
  let updateContratoUseCase: UpdateContratoUseCase;
  let deleteContratoUseCase: DeleteContratoUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContratoController],
      providers: [
        {
          provide: CreateContratoUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: ListContratosUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetContratoUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateContratoUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteContratoUseCase,
          useValue: {
            execute: jest.fn(),
          },
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
      const contratoData = {
        id_cliente: '1',
        valor_contrato: 5000.00,
        cod_orcamento: '1',
        status_contrato: StatusContrato.EM_ANALISE,
        data_inicio: new Date().toISOString(),
        data_entrega: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 dias depois
      };

      const expectedContrato = {
        id_contrato: '1',
        ...contratoData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(createContratoUseCase, 'execute').mockResolvedValue(expectedContrato);

      const result = await controller.create(contratoData);

      expect(result).toEqual(expectedContrato);
      expect(createContratoUseCase.execute).toHaveBeenCalledWith(contratoData);
    });
  });

  describe('findAll', () => {
    it('should return an array of contratos', async () => {
      const expectedContratos = [
        {
          id_contrato: '1',
          id_cliente: '1',
          valor_contrato: 5000.00,
          cod_orcamento: '1',
          status_contrato: StatusContrato.EM_ANALISE,
          data_inicio: new Date(),
          data_entrega: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_contrato: '2',
          id_cliente: '2',
          valor_contrato: 7500.00,
          cod_orcamento: '2',
          status_contrato: StatusContrato.EM_ANDAMENTO,
          data_inicio: new Date(),
          data_entrega: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(listContratosUseCase, 'execute').mockResolvedValue(expectedContratos);

      const result = await controller.findAll();

      expect(result).toEqual(expectedContratos);
      expect(listContratosUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single contrato', async () => {
      const expectedContrato = {
        id_contrato: '1',
        id_cliente: '1',
        valor_contrato: 5000.00,
        cod_orcamento: '1',
        status_contrato: StatusContrato.EM_ANALISE,
        data_inicio: new Date(),
        data_entrega: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(getContratoUseCase, 'execute').mockResolvedValue(expectedContrato);

      const result = await controller.findOne('1');

      expect(result).toEqual(expectedContrato);
      expect(getContratoUseCase.execute).toHaveBeenCalledWith('1');
    });
  });
}); 