import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrcamentoUseCase } from '../../src/application/use-cases/orcamento/create-orcamento.use-case';
import { ListOrcamentosUseCase } from '../../src/application/use-cases/orcamento/list-orcamentos.use-case';
import { GetOrcamentoUseCase } from '../../src/application/use-cases/orcamento/get-orcamento.use-case';
import { UpdateOrcamentoUseCase } from '../../src/application/use-cases/orcamento/update-orcamento.use-case';
import { DeleteOrcamentoUseCase } from '../../src/application/use-cases/orcamento/delete-orcamento.use-case';

describe('Orcamento Use Cases', () => {
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

    createOrcamentoUseCase = module.get<CreateOrcamentoUseCase>(CreateOrcamentoUseCase);
    listOrcamentosUseCase = module.get<ListOrcamentosUseCase>(ListOrcamentosUseCase);
    getOrcamentoUseCase = module.get<GetOrcamentoUseCase>(GetOrcamentoUseCase);
    updateOrcamentoUseCase = module.get<UpdateOrcamentoUseCase>(UpdateOrcamentoUseCase);
    deleteOrcamentoUseCase = module.get<DeleteOrcamentoUseCase>(DeleteOrcamentoUseCase);
  });

  it('should be defined', () => {
    expect(createOrcamentoUseCase).toBeDefined();
    expect(listOrcamentosUseCase).toBeDefined();
    expect(getOrcamentoUseCase).toBeDefined();
    expect(updateOrcamentoUseCase).toBeDefined();
    expect(deleteOrcamentoUseCase).toBeDefined();
  });

  describe('CreateOrcamentoUseCase', () => {
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

      const result = await createOrcamentoUseCase.execute(createOrcamentoDto);

      expect(result).toEqual(mockOrcamento);
      expect(mockCreateOrcamentoUseCase.execute).toHaveBeenCalledWith(createOrcamentoDto);
    });
  });

  describe('ListOrcamentosUseCase', () => {
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

      const result = await listOrcamentosUseCase.execute();

      expect(result).toEqual(mockOrcamentos);
      expect(mockListOrcamentosUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('GetOrcamentoUseCase', () => {
    it('should return a orcamento by id', async () => {
      const mockOrcamento = {
        cod_orcamento: '1',
        valor_orcamento: 1500.00,
        data_orcamento: new Date(),
        data_validade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        id_pacote: '1',
      };

      mockGetOrcamentoUseCase.execute.mockResolvedValue(mockOrcamento);

      const result = await getOrcamentoUseCase.execute('1');

      expect(result).toEqual(mockOrcamento);
      expect(mockGetOrcamentoUseCase.execute).toHaveBeenCalledWith('1');
    });
  });

  describe('UpdateOrcamentoUseCase', () => {
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

      mockUpdateOrcamentoUseCase.execute.mockResolvedValue(mockUpdatedOrcamento);

      const result = await updateOrcamentoUseCase.execute('1', updateOrcamentoDto);

      expect(result).toEqual(mockUpdatedOrcamento);
      expect(mockUpdateOrcamentoUseCase.execute).toHaveBeenCalledWith('1', updateOrcamentoDto);
    });
  });

  describe('DeleteOrcamentoUseCase', () => {
    it('should delete a orcamento', async () => {
      mockDeleteOrcamentoUseCase.execute.mockResolvedValue(true);

      const result = await deleteOrcamentoUseCase.execute('1');

      expect(result).toBe(true);
      expect(mockDeleteOrcamentoUseCase.execute).toHaveBeenCalledWith('1');
    });
  });
}); 