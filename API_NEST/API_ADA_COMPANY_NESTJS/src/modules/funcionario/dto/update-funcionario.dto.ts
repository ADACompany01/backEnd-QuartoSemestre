import { IsEmail, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFuncionarioDto {
  @ApiProperty({
    description: 'Nome completo do funcionário',
    example: 'Pedro Silva',
    required: false
  })
  @IsString()
  @IsOptional()
  nome_completo?: string;

  @ApiProperty({
    description: 'Email do funcionário',
    example: 'pedro.silva@adacompany.com',
    required: false
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Telefone do funcionário',
    example: '(11) 97777-7777',
    required: false
  })
  @IsString()
  @IsOptional()
  telefone?: string;

  @ApiProperty({
    description: 'ID do usuário associado',
    example: 3,
    required: false
  })
  @IsNumber()
  @IsOptional()
  id_usuario?: number;
} 