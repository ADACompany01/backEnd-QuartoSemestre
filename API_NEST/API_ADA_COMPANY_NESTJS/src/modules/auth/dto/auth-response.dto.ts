import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: 'Token de acesso JWT',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  accessToken: string;

  @ApiProperty({
    description: 'Tipo do usuário',
    example: 'cliente'
  })
  tipo: string;

  @ApiProperty({
    description: 'Dados do usuário',
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      nome: 'João Silva',
      email: 'joao.silva@email.com'
    }
  })
  usuario: any;
} 