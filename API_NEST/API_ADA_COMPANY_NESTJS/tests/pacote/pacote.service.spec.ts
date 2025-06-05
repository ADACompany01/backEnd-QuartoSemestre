import { Test, TestingModule } from '@nestjs/testing';
import { PacoteModule } from '../../src/modules/pacote.module';
import { CreatePacoteUseCase } from '../../src/application/use-cases/pacote/create-pacote.use-case';
import { ListPacotesUseCase } from '../../src/application/use-cases/pacote/list-pacotes.use-case';
import { GetPacoteUseCase } from '../../src/application/use-cases/pacote/get-pacote.use-case';
import { UpdatePacoteUseCase } from '../../src/application/use-cases/pacote/update-pacote.use-case';
import { DeletePacoteUseCase } from '../../src/application/use-cases/pacote/delete-pacote.use-case';
import { PACOTE_REPOSITORY } from '../../src/infrastructure/providers/pacote.provider';
import { ClienteRepositoryImpl } from '../../src/infrastructure/database/repositories/cliente.repository';
import { TipoPacote } from '../../src/infrastructure/database/entities/pacote.entity';

describe('PacoteService', () => {
  let createPacoteUseCase: CreatePacoteUseCase;
  let listPacotesUseCase: ListPacotesUseCase;
  let getPacoteUseCase: GetPacoteUseCase;
  let updatePacoteUseCase: UpdatePacoteUseCase;
  let deletePacoteUseCase: DeletePacoteUseCase;

  const mockPacoteRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockClienteRepository = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PacoteModule],
    })
      .overrideProvider(PACOTE_REPOSITORY)
      .useValue(mockPacoteRepository)
      .overrideProvider(ClienteRepositoryImpl)
      .useValue(mockClienteRepository)
      .compile();

    createPacoteUseCase = module.get<CreatePacoteUseCase>(CreatePacoteUseCase);
    listPacotesUseCase = module.get<ListPacotesUseCase>(ListPacotesUseCase);
    getPacoteUseCase = module.get<GetPacoteUseCase>(GetPacoteUseCase);
    updatePacoteUseCase = module.get<UpdatePacoteUseCase>(UpdatePacoteUseCase);
    deletePacoteUseCase = module.get<DeletePacoteUseCase>(DeletePacoteUseCase);
  });

  it('should be defined', () => {
    expect(createPacoteUseCase).toBeDefined();
    expect(listPacotesUseCase).toBeDefined();
    expect(getPacoteUseCase).toBeDefined();
    expect(updatePacoteUseCase).toBeDefined();
    expect(deletePacoteUseCase).toBeDefined();
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

      mockPacoteRepository.create.mockResolvedValue(expectedPacote);
      mockClienteRepository.findById.mockResolvedValue({ id_cliente: '1' });

      const result = await createPacoteUseCase.execute(pacoteData);

      expect(result).toEqual(expectedPacote);
      expect(mockPacoteRepository.create).toHaveBeenCalledWith(pacoteData);
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

      mockPacoteRepository.findAll.mockResolvedValue(expectedPacotes);

      const result = await listPacotesUseCase.execute();

      expect(result).toEqual(expectedPacotes);
      expect(mockPacoteRepository.findAll).toHaveBeenCalled();
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

      mockPacoteRepository.findById.mockResolvedValue(expectedPacote);

      const result = await getPacoteUseCase.execute('1');

      expect(result).toEqual(expectedPacote);
      expect(mockPacoteRepository.findById).toHaveBeenCalledWith('1');
    });
  });
}); 