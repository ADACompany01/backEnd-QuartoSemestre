import { ApiProperty } from '@nestjs/swagger';

export class ClienteResponseDto {
  @ApiProperty({
    description: 'ID do cliente',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  id: string;

  @ApiProperty({
    description: 'Nome do cliente',
    example: 'João Silva'
  })
  nome: string;

  @ApiProperty({
    description: 'Email do cliente',
    example: 'joao.silva@email.com'
  })
  email: string;

  @ApiProperty({
    description: 'Telefone do cliente',
    example: '(11) 98765-4321'
  })
  telefone: string;

  @ApiProperty({
    description: 'CPF do cliente',
    example: '123.456.789-00'
  })
  cpf: string;

  @ApiProperty({
    description: 'Endereço do cliente',
    example: 'Rua das Flores, 123'
  })
  endereco: string;

  @ApiProperty({
    description: 'Status do cliente (ativo/inativo)',
    example: true
  })
  ativo: boolean;

  @ApiProperty({
    description: 'Data de criação do cliente',
    example: '2025-05-21T17:32:28Z'
  })
  dataCriacao: Date;
} 