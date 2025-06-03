import { Cliente } from '../../../infrastructure/database/entities/cliente.entity';
import { ClienteRepositoryImpl } from '../../../infrastructure/database/repositories/cliente.repository';
import { CreateClienteDto } from '../../../interfaces/http/dtos/requests/create-cliente.dto';
import { UsuarioRepository } from '../../../infrastructure/database/repositories/usuario.repository';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateClienteUseCase {
  constructor(
    private readonly clienteRepository: ClienteRepositoryImpl,
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async execute(data: CreateClienteDto): Promise<Cliente> {
    // Check if email already exists
    const existingUser = await this.usuarioRepository.findByEmail(data.email);
    if (existingUser) {
      throw new HttpException('Email já cadastrado', HttpStatus.CONFLICT);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.senha, 10);

    // Create associated user
    const usuario = await this.usuarioRepository.create({
      nome_completo: data.nome_completo,
      email: data.email,
      senha: hashedPassword,
      telefone: data.telefone, // Assuming telefone is part of Usuario or should be passed to Usuario creation
      // Add other user properties as needed
    });

    // Create cliente with the associated user's ID
    const cliente = await this.clienteRepository.create({
      ...data,
      id_usuario: usuario.id_usuario, // Link Cliente to the created Usuario
      // Ensure no user-specific fields are passed directly to clienteRepository.create that should only be on User
      // For example, remove email, senha, nome_completo, telefone from data if cliente entity doesn't have them
    });

    return cliente;
  }
} 