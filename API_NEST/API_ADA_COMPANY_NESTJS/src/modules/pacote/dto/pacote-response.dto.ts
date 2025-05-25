import { ApiProperty } from '@nestjs/swagger';
import { TipoPacote } from './create-pacote.dto';

export class PacoteResponseDto {
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
    description: 'Tipo do pacote',
    example: 'AA',
    enum: TipoPacote
  })
  tipo_pacote: TipoPacote;

  @ApiProperty({
    description: 'Valor base do pacote',
    example: 1000.00
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
    type: Object,
    additionalProperties: true
  })
  cliente: any;

  @ApiProperty({
    description: 'Orçamento associado',
    type: Object,
    additionalProperties: true,
    required: false
  })
  orcamento?: any;
} 