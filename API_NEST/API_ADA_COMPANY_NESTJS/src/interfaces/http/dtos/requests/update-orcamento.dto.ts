import { IsOptional, IsNumber, IsUUID } from 'class-validator';
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
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsUUID('4', { message: 'O ID do pacote deve ser um UUID válido.' })
  @IsOptional()
  id_pacote?: string;
} 