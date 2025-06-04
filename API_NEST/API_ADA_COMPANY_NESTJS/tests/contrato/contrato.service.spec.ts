import { Test, TestingModule } from '@nestjs/testing';
import { ContratoModule } from '../../src/modules/contrato.module';
import { CreateContratoUseCase } from '../../src/application/use-cases/contrato/create-contrato.use-case';
import { ListContratosUseCase } from '../../src/application/use-cases/contrato/list-contratos.use-case';
import { GetContratoUseCase } from '../../src/application/use-cases/contrato/get-contrato.use-case';
import { UpdateContratoUseCase } from '../../src/application/use-cases/contrato/update-contrato.use-case';
import { DeleteContratoUseCase } from '../../src/application/use-cases/contrato/delete-contrato.use-case';
import { CONTRATO_REPOSITORY } from '../../src/infrastructure/providers/contrato.provider';
import { ClienteRepository } from '../../src/infrastructure/database/repositories/cliente.repository';
import { OrcamentoRepository } from '../../src/infrastructure/database/repositories/orcamento.repository';
import { StatusContrato } from '../../src/infrastructure/database/entities/contrato.entity';

describe('ContratoService', () => {
  let createContratoUseCase: CreateContratoUseCase;
  let listContratosUseCase: ListContratosUseCase;
  let getContratoUseCase: GetContratoUseCase;
  let updateContratoUseCase: UpdateContratoUseCase;
  let deleteContratoUseCase: DeleteContratoUseCase;

  const mockContratoRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockClienteRepository = {
    findById: jest.fn(),
  };

  const mockOrcamentoRepository = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ContratoModule],
    })
      .overrideProvider(CONTRATO_REPOSITORY)
      .useValue(mockContratoRepository)
      .overrideProvider(ClienteRepository)
      .useValue(mockClienteRepository)
      .overrideProvider(OrcamentoRepository)
      .useValue(mockOrcamentoRepository)
      .compile();

    createContratoUseCase = module.get<CreateContratoUseCase>(CreateContratoUseCase);
    listContratosUseCase = module.get<ListContratosUseCase>(ListContratosUseCase);
    getContratoUseCase = module.get<GetContratoUseCase>(GetContratoUseCase);
    updateContratoUseCase = module.get<UpdateContratoUseCase>(UpdateContratoUseCase);
    deleteContratoUseCase = module.get<DeleteContratoUseCase>(DeleteContratoUseCase);
  });

  it('should be defined', () => {
    expect(createContratoUseCase).toBeDefined();
    expect(listContratosUseCase).toBeDefined();
    expect(getContratoUseCase).toBeDefined();
    expect(updateContratoUseCase).toBeDefined();
    expect(deleteContratoUseCase).toBeDefined();
  });

  describe('create', () => {
    it('should create a new contrato', async () => {
      const contratoData = {
        id_cliente: '1',
        valor_contrato: 5000.00,
        cod_orcamento: '1',
        status_contrato: StatusContrato.EM_ANALISE,
        data_inicio: new Date(),
        data_entrega: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias depois
      };

      const expectedContrato = {
        id_contrato: '1',
        ...contratoData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockContratoRepository.create.mockResolvedValue(expectedContrato);
      mockClienteRepository.findById.mockResolvedValue({ id_cliente: '1' });
      mockOrcamentoRepository.findById.mockResolvedValue({ id_orcamento: '1' });

      const result = await createContratoUseCase.execute(contratoData);

      expect(result).toEqual(expectedContrato);
      expect(mockContratoRepository.create).toHaveBeenCalledWith(contratoData);
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

      mockContratoRepository.findAll.mockResolvedValue(expectedContratos);

      const result = await listContratosUseCase.execute();

      expect(result).toEqual(expectedContratos);
      expect(mockContratoRepository.findAll).toHaveBeenCalled();
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

      mockContratoRepository.findById.mockResolvedValue(expectedContrato);

      const result = await getContratoUseCase.execute('1');

      expect(result).toEqual(expectedContrato);
      expect(mockContratoRepository.findById).toHaveBeenCalledWith('1');
    });
  });
}); 