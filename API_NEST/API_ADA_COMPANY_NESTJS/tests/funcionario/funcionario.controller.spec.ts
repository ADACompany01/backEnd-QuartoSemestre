import { Test, TestingModule } from '@nestjs/testing';
import { FuncionarioController } from '../../src/interfaces/http/controllers/funcionario.controller';
import { CreateFuncionarioUseCase } from '../../src/application/use-cases/funcionario/create-funcionario.use-case';
import { ListFuncionariosUseCase } from '../../src/application/use-cases/funcionario/list-funcionarios.use-case';
import { GetFuncionarioUseCase } from '../../src/application/use-cases/funcionario/get-funcionario.use-case';
import { GetFuncionarioByEmailUseCase } from '../../src/application/use-cases/funcionario/get-funcionario-by-email.use-case';
import { UpdateFuncionarioUseCase } from '../../src/application/use-cases/funcionario/update-funcionario.use-case';
import { DeleteFuncionarioUseCase } from '../../src/application/use-cases/funcionario/delete-funcionario.use-case';

describe('FuncionarioController', () => {
  let controller: FuncionarioController;
  let createFuncionarioUseCase: CreateFuncionarioUseCase;
  let listFuncionariosUseCase: ListFuncionariosUseCase;
  let getFuncionarioUseCase: GetFuncionarioUseCase;
  let getFuncionarioByEmailUseCase: GetFuncionarioByEmailUseCase;
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

  const mockGetFuncionarioByEmailUseCase = {
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
      controllers: [FuncionarioController],
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
          provide: GetFuncionarioByEmailUseCase,
          useValue: mockGetFuncionarioByEmailUseCase,
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

    controller = module.get<FuncionarioController>(FuncionarioController);
    createFuncionarioUseCase = module.get<CreateFuncionarioUseCase>(CreateFuncionarioUseCase);
    listFuncionariosUseCase = module.get<ListFuncionariosUseCase>(ListFuncionariosUseCase);
    getFuncionarioUseCase = module.get<GetFuncionarioUseCase>(GetFuncionarioUseCase);
    getFuncionarioByEmailUseCase = module.get<GetFuncionarioByEmailUseCase>(GetFuncionarioByEmailUseCase);
    updateFuncionarioUseCase = module.get<UpdateFuncionarioUseCase>(UpdateFuncionarioUseCase);
    deleteFuncionarioUseCase = module.get<DeleteFuncionarioUseCase>(DeleteFuncionarioUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new funcionario', async () => {
      const createFuncionarioDto = {
        nome_completo: 'Funcionario Teste',
        email: 'funcionario@email.com',
        senha: 'senha123',
        telefone: '(11) 97777-7777',
      };

      const mockFuncionario = {
        id_funcionario: '1',
        ...createFuncionarioDto,
        id_usuario: '1',
      };

      mockCreateFuncionarioUseCase.execute.mockResolvedValue(mockFuncionario);

      const result = await controller.create(createFuncionarioDto);

      expect(result).toEqual(mockFuncionario);
      expect(mockCreateFuncionarioUseCase.execute).toHaveBeenCalledWith(createFuncionarioDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of funcionarios', async () => {
      const mockFuncionarios = [
        {
          id_funcionario: '1',
          nome_completo: 'Funcionario 1',
          email: 'funcionario1@email.com',
          telefone: '(11) 97777-7777',
          id_usuario: '1',
        },
        {
          id_funcionario: '2',
          nome_completo: 'Funcionario 2',
          email: 'funcionario2@email.com',
          telefone: '(11) 97777-7778',
          id_usuario: '2',
        },
      ];

      mockListFuncionariosUseCase.execute.mockResolvedValue(mockFuncionarios);

      const result = await controller.findAll();

      expect(result).toEqual(mockFuncionarios);
      expect(mockListFuncionariosUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a funcionario by id', async () => {
      const mockFuncionario = {
        id_funcionario: '1',
        nome_completo: 'Funcionario Teste',
        email: 'funcionario@email.com',
        telefone: '(11) 97777-7777',
        id_usuario: '1',
      };

      mockGetFuncionarioUseCase.execute.mockResolvedValue(mockFuncionario);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockFuncionario);
      expect(mockGetFuncionarioUseCase.execute).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a funcionario', async () => {
      const updateFuncionarioDto = {
        nome_completo: 'Funcionario Atualizado',
        telefone: '(11) 97777-7778',
      };

      const mockUpdatedFuncionario = {
        id_funcionario: '1',
        nome_completo: 'Funcionario Atualizado',
        email: 'funcionario@email.com',
        telefone: '(11) 97777-7778',
        id_usuario: '1',
      };

      mockUpdateFuncionarioUseCase.execute.mockResolvedValue(mockUpdatedFuncionario);

      const result = await controller.update('1', updateFuncionarioDto);

      expect(result).toEqual(mockUpdatedFuncionario);
      expect(mockUpdateFuncionarioUseCase.execute).toHaveBeenCalledWith('1', updateFuncionarioDto);
    });
  });

  describe('remove', () => {
    it('should delete a funcionario', async () => {
      mockDeleteFuncionarioUseCase.execute.mockResolvedValue(true);

      const result = await controller.remove('1');

      expect(result).toBe(true);
      expect(mockDeleteFuncionarioUseCase.execute).toHaveBeenCalledWith('1');
    });
  });

  describe('findByEmail', () => {
    it('should return a funcionario by email', async () => {
      const mockFuncionario = {
        id_funcionario: '1',
        nome_completo: 'Funcionario Teste',
        email: 'funcionario@email.com',
        telefone: '(11) 97777-7777',
        id_usuario: '1',
      };

      mockGetFuncionarioByEmailUseCase.execute.mockResolvedValue(mockFuncionario);

      const result = await controller.findByEmail('funcionario@email.com');

      expect(result).toEqual(mockFuncionario);
      expect(mockGetFuncionarioByEmailUseCase.execute).toHaveBeenCalledWith('funcionario@email.com');
    });
  });
});
