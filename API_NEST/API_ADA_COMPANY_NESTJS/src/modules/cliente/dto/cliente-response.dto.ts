import { ApiProperty } from '@nestjs/swagger';

export class ClienteResponseDto {
  @ApiProperty({
    description: 'ID do cliente',
    example: 1
  })
  id_cliente: number;

  @ApiProperty({
    description: 'Nome do cliente',
    example: 'João Silva'
  })
  nome_completo: string;

  @ApiProperty({
    description: 'CNPJ do cliente',
    example: '12.345.678/0001-90'
  })
  cnpj: string;

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
    description: 'ID do usuário associado',
    example: 1
  })
  id_usuario: number;
} 