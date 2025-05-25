import { IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrcamentoDto {
  @ApiProperty({
    description: 'Valor do orçamento',
    example: 1500.00,
    required: false
  })
  @IsNumber()
  @IsOptional()
  valor_orcamento?: number;

  @ApiProperty({
    description: 'ID do pacote',
    example: 1,
    required: false
  })
  @IsNumber()
  @IsOptional()
  id_pacote?: number;

  @ApiProperty({
    description: 'ID do cliente',
    example: 1,
    required: false
  })
  @IsNumber()
  @IsOptional()
  id_cliente?: number;
} 