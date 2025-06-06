import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';

// Mock para o repositório ou dependências
const mockClienteRepository = {
  findAll: jest.fn().mockResolvedValue([{ id_cliente: '1', nome_completo: 'Cliente Teste' }]),
  findOne: jest.fn().mockResolvedValue({ id_cliente: '1', nome_completo: 'Cliente Teste' }),
  create: jest.fn().mockResolvedValue({ id_cliente: '1', nome_completo: 'Novo Cliente' }),
};

describe('ClienteService', () => {
  let service: ClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteService,
        { provide: 'ClienteRepository', useValue: mockClienteRepository },
      ],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
  });

  it('deve retornar todos os clientes', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{ id_cliente: '1', nome_completo: 'Cliente Teste' }]);
  });

  it('deve retornar um cliente pelo id', async () => {
    const result = await service.findOne('1');
    expect(result).toEqual({ id_cliente: '1', nome_completo: 'Cliente Teste' });
  });

  it('deve criar um novo cliente', async () => {
    const dto = { nome_completo: 'Novo Cliente' };
    const result = await service.create(dto as any);
    expect(result).toEqual({ id_cliente: '1', nome_completo: 'Novo Cliente' });
  });
}); 