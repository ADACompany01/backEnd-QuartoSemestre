import { ApiProperty } from '@nestjs/swagger';

export class FuncionarioResponseDto {
  @ApiProperty({
    description: 'ID do funcionário',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  id: string;

  @ApiProperty({
    description: 'Nome do funcionário',
    example: 'Maria Silva'
  })
  nome: string;

  @ApiProperty({
    description: 'Email do funcionário',
    example: 'maria.silva@adacompany.com'
  })
  email: string;

  @ApiProperty({
    description: 'Telefone do funcionário',
    example: '(11) 98765-4321'
  })
  telefone: string;

  @ApiProperty({
    description: 'CPF do funcionário',
    example: '123.456.789-00'
  })
  cpf: string;

  @ApiProperty({
    description: 'Cargo do funcionário',
    example: 'Desenvolvedor'
  })
  cargo: string;

  @ApiProperty({
    description: 'Especialidade do funcionário',
    example: 'Backend'
  })
  especialidade: string;

  @ApiProperty({
    description: 'Status do funcionário (ativo/inativo)',
    example: true
  })
  ativo: boolean;

  @ApiProperty({
    description: 'Data de criação do funcionário',
    example: '2025-05-21T17:32:28Z'
  })
  dataCriacao: Date;
} 