import { IsOptional, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TipoPacote } from './create-pacote.dto';

export class UpdatePacoteDto {
  @ApiProperty({
    description: 'ID do cliente',
    example: 1,
    required: false
  })
  @IsNumber()
  @IsOptional()
  id_cliente?: number;

  @ApiProperty({
    description: 'Tipo do pacote de acessibilidade',
    enum: TipoPacote,
    example: TipoPacote.AA,
    required: false
  })
  @IsEnum(TipoPacote)
  @IsOptional()
  tipo_pacote?: TipoPacote;

  @ApiProperty({
    description: 'Valor base do pacote',
    example: 1500.00,
    required: false
  })
  @IsNumber()
  @IsOptional()
  valor_base?: number;
} 