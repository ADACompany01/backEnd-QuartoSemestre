import { ApiProperty } from '@nestjs/swagger';
import { StatusContrato } from './create-contrato.dto';

export class ContratoResponseDto {
  @ApiProperty({
    description: 'ID do contrato',
    example: 1
  })
  id_contrato: number;

  @ApiProperty({
    description: 'ID do cliente',
    example: 1
  })
  id_cliente: number;

  @ApiProperty({
    description: 'Valor do contrato',
    example: 5000.00
  })
  valor_contrato: number;

  @ApiProperty({
    description: 'Código do orçamento',
    example: 1
  })
  cod_orcamento: number;

  @ApiProperty({
    description: 'Status do contrato',
    enum: StatusContrato,
    example: StatusContrato.ATIVO
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
    type: Object,
    additionalProperties: true
  })
  cliente: any;

  @ApiProperty({
    description: 'Orçamento associado',
    type: Object,
    additionalProperties: true
  })
  orcamento: any;
} 