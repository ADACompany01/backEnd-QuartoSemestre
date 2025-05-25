import { ApiProperty } from '@nestjs/swagger';

export class OrcamentoResponseDto {
  @ApiProperty({
    description: 'Código do orçamento',
    example: 1
  })
  cod_orcamento: number;

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
    example: 1
  })
  id_pacote: number;

  @ApiProperty({
    description: 'ID do cliente',
    example: 1
  })
  id_cliente: number;

  @ApiProperty({
    description: 'Pacote associado',
    type: Object,
    additionalProperties: true
  })
  pacote: any;

  @ApiProperty({
    description: 'Cliente associado',
    type: Object,
    additionalProperties: true
  })
  cliente: any;

  @ApiProperty({
    description: 'Contrato associado',
    type: Object,
    additionalProperties: true,
    required: false
  })
  contrato?: any;
} 