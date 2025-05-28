import { ApiProperty } from '@nestjs/swagger';
import { StatusContrato } from './create-contrato.dto';

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

export class OrcamentoResponseDto {
  @ApiProperty({
    description: 'Código do orçamento',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  cod_orcamento: string;

  @ApiProperty({
    description: 'Valor do orçamento',
    example: 5000.00
  })
  valor_orcamento: number;

  @ApiProperty({
    description: 'Data do orçamento',
    example: '2024-05-01'
  })
  data_orcamento: Date;

  @ApiProperty({
    description: 'Data de validade do orçamento',
    example: '2024-05-30'
  })
  data_validade: Date;
}

export class ContratoResponseDto {
  @ApiProperty({
    description: 'ID do contrato',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id_contrato: string;

  @ApiProperty({
    description: 'ID do cliente',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id_cliente: string;

  @ApiProperty({
    description: 'Valor do contrato',
    example: 5000.00
  })
  valor_contrato: number;

  @ApiProperty({
    description: 'Código do orçamento',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  cod_orcamento: string;

  @ApiProperty({
    description: 'Status do contrato',
    enum: StatusContrato,
    example: StatusContrato.EM_ANALISE
  })
  status_contrato: StatusContrato;

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

  @ApiProperty({
    description: 'Cliente associado',
    type: ClienteResponseDto
  })
  cliente: ClienteResponseDto;

  @ApiProperty({
    description: 'Orçamento associado',
    type: OrcamentoResponseDto
  })
  orcamento: OrcamentoResponseDto;
} 