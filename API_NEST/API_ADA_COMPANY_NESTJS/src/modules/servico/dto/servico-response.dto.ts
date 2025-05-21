import { ApiProperty } from '@nestjs/swagger';

export class ServicoResponseDto {
  @ApiProperty({
    description: 'ID do serviço',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  id: string;

  @ApiProperty({
    description: 'Nome do serviço',
    example: 'Desenvolvimento de API'
  })
  nome: string;

  @ApiProperty({
    description: 'Descrição do serviço',
    example: 'Desenvolvimento de API RESTful com NestJS e Swagger'
  })
  descricao: string;

  @ApiProperty({
    description: 'Valor do serviço',
    example: 2500.00
  })
  valor: number;

  @ApiProperty({
    description: 'Status do serviço (ativo/inativo)',
    example: true
  })
  ativo: boolean;

  @ApiProperty({
    description: 'Data de criação do serviço',
    example: '2025-05-21T17:32:28Z'
  })
  dataCriacao: Date;

  @ApiProperty({
    description: 'ID do funcionário responsável pelo serviço',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  funcionarioId: string;

  @ApiProperty({
    description: 'Dados do funcionário responsável pelo serviço',
    required: false,
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      nome: 'Maria Silva',
      email: 'maria.silva@adacompany.com'
    }
  })
  funcionario?: any;
} 