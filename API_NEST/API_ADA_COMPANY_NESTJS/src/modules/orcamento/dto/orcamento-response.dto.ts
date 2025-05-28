import { ApiProperty } from '@nestjs/swagger';

export class PacoteResponseDto {
  @ApiProperty({
    description: 'ID do pacote',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id_pacote: string;

  @ApiProperty({
    description: 'Tipo do pacote',
    example: 'BASICO'
  })
  tipo_pacote: string;

  @ApiProperty({
    description: 'Valor base do pacote',
    example: 1500.00
  })
  valor_base: number;
}

export class ClienteResponseDto {
  @ApiProperty({
    description: 'ID do cliente',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id_cliente: string;

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
}

export class ContratoResponseDto {
  @ApiProperty({
    description: 'ID do contrato',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id_contrato: string;

  @ApiProperty({
    description: 'Valor do contrato',
    example: 1500.00
  })
  valor_contrato: number;

  @ApiProperty({
    description: 'Status do contrato',
    example: 'ATIVO'
  })
  status_contrato: string;

  @ApiProperty({
    description: 'Data de início do contrato',
    example: '2024-05-01'
  })
  data_inicio: Date;

  @ApiProperty({
    description: 'Data de entrega do contrato',
    example: '2024-05-30'
  })
  data_entrega: Date;
}

export class OrcamentoResponseDto {
  @ApiProperty({
    description: 'Código do orçamento',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  cod_orcamento: string;

  @ApiProperty({
    description: 'Valor do orçamento',
    example: 1500.00
  })
  valor_orcamento: number;

  @ApiProperty({
    description: 'Data do orçamento',
    example: '2024-03-21T10:00:00Z'
  })
  data_orcamento: Date;

  @ApiProperty({
    description: 'Data de validade do orçamento',
    example: '2024-04-21T10:00:00Z'
  })
  data_validade: Date;

  @ApiProperty({
    description: 'ID do pacote',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id_pacote: string;

  @ApiProperty({
    description: 'ID do cliente',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id_cliente: string;

  @ApiProperty({
    description: 'Pacote associado',
    type: PacoteResponseDto
  })
  pacote: PacoteResponseDto;

  @ApiProperty({
    description: 'Cliente associado',
    type: ClienteResponseDto
  })
  cliente: ClienteResponseDto;

  @ApiProperty({
    description: 'Contrato associado',
    type: ContratoResponseDto,
    required: false
  })
  contrato?: ContratoResponseDto;
} 