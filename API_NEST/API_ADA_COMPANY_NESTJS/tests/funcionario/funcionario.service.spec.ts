import { Test, TestingModule } from '@nestjs/testing';
import { CreateFuncionarioUseCase } from '../../src/application/use-cases/funcionario/create-funcionario.use-case';
import { ListFuncionariosUseCase } from '../../src/application/use-cases/funcionario/list-funcionarios.use-case';
import { GetFuncionarioUseCase } from '../../src/application/use-cases/funcionario/get-funcionario.use-case';
import { UpdateFuncionarioUseCase } from '../../src/application/use-cases/funcionario/update-funcionario.use-case';
import { DeleteFuncionarioUseCase } from '../../src/application/use-cases/funcionario/delete-funcionario.use-case';

describe('Funcionario Use Cases', () => {
  let createFuncionarioUseCase: CreateFuncionarioUseCase;
  let listFuncionariosUseCase: ListFuncionariosUseCase;
  let getFuncionarioUseCase: GetFuncionarioUseCase;
  let updateFuncionarioUseCase: UpdateFuncionarioUseCase;
  let deleteFuncionarioUseCase: DeleteFuncionarioUseCase;

  const mockCreateFuncionarioUseCase = {
    execute: jest.fn(),
  };

  const mockListFuncionariosUseCase = {
    execute: jest.fn(),
  };

  const mockGetFuncionarioUseCase = {
    execute: jest.fn(),
  };

  const mockUpdateFuncionarioUseCase = {
    execute: jest.fn(),
  };

  const mockDeleteFuncionarioUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CreateFuncionarioUseCase,
          useValue: mockCreateFuncionarioUseCase,
        },
        {
          provide: ListFuncionariosUseCase,
          useValue: mockListFuncionariosUseCase,
        },
        {
          provide: GetFuncionarioUseCase,
          useValue: mockGetFuncionarioUseCase,
        },
        {
          provide: UpdateFuncionarioUseCase,
          useValue: mockUpdateFuncionarioUseCase,
        },
        {
          provide: DeleteFuncionarioUseCase,
          useValue: mockDeleteFuncionarioUseCase,
        },
      ],
    }).compile();

    createFuncionarioUseCase = module.get<CreateFuncionarioUseCase>(CreateFuncionarioUseCase);
    listFuncionariosUseCase = module.get<ListFuncionariosUseCase>(ListFuncionariosUseCase);
    getFuncionarioUseCase = module.get<GetFuncionarioUseCase>(GetFuncionarioUseCase);
    updateFuncionarioUseCase = module.get<UpdateFuncionarioUseCase>(UpdateFuncionarioUseCase);
    deleteFuncionarioUseCase = module.get<DeleteFuncionarioUseCase>(DeleteFuncionarioUseCase);
  });

  it('should be defined', () => {
    expect(createFuncionarioUseCase).toBeDefined();
    expect(listFuncionariosUseCase).toBeDefined();
    expect(getFuncionarioUseCase).toBeDefined();
    expect(updateFuncionarioUseCase).toBeDefined();
    expect(deleteFuncionarioUseCase).toBeDefined();
  });

  describe('CreateFuncionarioUseCase', () => {
    it('should create a new funcionario', async () => {
      const createFuncionarioDto = {
        nome_completo: 'Funcionario Teste',
        email: 'funcionario@email.com',
        senha: 'senha123',
        telefone: '11999999999',
      };

      const mockFuncionario = {
        id_funcionario: '1',
        ...createFuncionarioDto,
        id_usuario: '1',
      };

      mockCreateFuncionarioUseCase.execute.mockResolvedValue(mockFuncionario);

      const result = await createFuncionarioUseCase.execute(createFuncionarioDto);

      expect(result).toEqual(mockFuncionario);
      expect(mockCreateFuncionarioUseCase.execute).toHaveBeenCalledWith(createFuncionarioDto);
    });
  });

  describe('ListFuncionariosUseCase', () => {
    it('should return an array of funcionarios', async () => {
      const mockFuncionarios = [
        {
          id_funcionario: '1',
          nome_completo: 'Funcionario 1',
          email: 'funcionario1@email.com',
          telefone: '11999999999',
          id_usuario: '1',
        },
        {
          id_funcionario: '2',
          nome_completo: 'Funcionario 2',
          email: 'funcionario2@email.com',
          telefone: '11999999998',
          id_usuario: '2',
        },
      ];

      mockListFuncionariosUseCase.execute.mockResolvedValue(mockFuncionarios);

      const result = await listFuncionariosUseCase.execute();

      expect(result).toEqual(mockFuncionarios);
      expect(mockListFuncionariosUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('GetFuncionarioUseCase', () => {
    it('should return a funcionario by id', async () => {
      const mockFuncionario = {
        id_funcionario: '1',
        nome_completo: 'Funcionario Teste',
        email: 'funcionario@email.com',
        telefone: '11999999999',
        id_usuario: '1',
      };

      mockGetFuncionarioUseCase.execute.mockResolvedValue(mockFuncionario);

      const result = await getFuncionarioUseCase.execute('1');

      expect(result).toEqual(mockFuncionario);
      expect(mockGetFuncionarioUseCase.execute).toHaveBeenCalledWith('1');
    });
  });

  describe('UpdateFuncionarioUseCase', () => {
    it('should update a funcionario', async () => {
      const updateFuncionarioDto = {
        nome_completo: 'Funcionario Atualizado',
        telefone: '11999999998',
      };

      const mockUpdatedFuncionario = {
        id_funcionario: '1',
        nome_completo: 'Funcionario Atualizado',
        email: 'funcionario@email.com',
        telefone: '11999999998',
        id_usuario: '1',
      };

      mockUpdateFuncionarioUseCase.execute.mockResolvedValue(mockUpdatedFuncionario);

      const result = await updateFuncionarioUseCase.execute('1', updateFuncionarioDto);

      expect(result).toEqual(mockUpdatedFuncionario);
      expect(mockUpdateFuncionarioUseCase.execute).toHaveBeenCalledWith('1', updateFuncionarioDto);
    });
  });

  describe('DeleteFuncionarioUseCase', () => {
    it('should delete a funcionario', async () => {
      mockDeleteFuncionarioUseCase.execute.mockResolvedValue(true);

      const result = await deleteFuncionarioUseCase.execute('1');

      expect(result).toBe(true);
      expect(mockDeleteFuncionarioUseCase.execute).toHaveBeenCalledWith('1');
    });
  });
}); 