import { ApiProperty } from '@nestjs/swagger';
import { TipoPacote } from './create-pacote.dto';

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
}

export class PacoteResponseDto {
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
    description: 'Tipo do pacote',
    example: 'AA',
    enum: TipoPacote
  })
  tipo_pacote: TipoPacote;

  @ApiProperty({
    description: 'Valor base do pacote',
    example: 1500.00
  })
  valor_base: number;

  @ApiProperty({
    description: 'Data de criação do pacote',
    example: '2024-03-20T10:00:00Z'
  })
  created_at: Date;

  @ApiProperty({
    description: 'Data da última atualização do pacote',
    example: '2024-03-20T10:00:00Z'
  })
  updated_at: Date;

  @ApiProperty({
    description: 'Cliente associado',
    type: ClienteResponseDto
  })
  cliente: ClienteResponseDto;

  @ApiProperty({
    description: 'Orçamento associado',
    type: OrcamentoResponseDto,
    required: false
  })
  orcamento?: OrcamentoResponseDto;
} 