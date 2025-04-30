import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Funcionario } from './funcionario.entity';

@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(Funcionario)
    private funcionarioRepository: Repository<Funcionario>,
  ) {}

  async findAll(): Promise<Funcionario[]> {
    return this.funcionarioRepository.find({ where: { ativo: true } });
  }

  async findOne(id: string): Promise<Funcionario> {
    const funcionario = await this.funcionarioRepository.findOne({ where: { id, ativo: true } });
    if (!funcionario) {
      throw new NotFoundException(`Funcionário com ID ${id} não encontrado`);
    }
    return funcionario;
  }

  async findByEmail(email: string): Promise<Funcionario> {
    return this.funcionarioRepository.findOne({ where: { email, ativo: true } });
  }

  async create(funcionarioData: Partial<Funcionario>): Promise<Funcionario> {
    const existingFuncionario = await this.funcionarioRepository.findOne({ where: { email: funcionarioData.email } });
    if (existingFuncionario) {
      throw new ConflictException(`Funcionário com email ${funcionarioData.email} já existe`);
    }

    const hashedPassword = await bcrypt.hash(funcionarioData.senha, 10);
    const funcionario = this.funcionarioRepository.create({
      ...funcionarioData,
      senha: hashedPassword,
    });

    return this.funcionarioRepository.save(funcionario);
  }

  async update(id: string, funcionarioData: Partial<Funcionario>): Promise<Funcionario> {
    const funcionario = await this.findOne(id);
    
    if (funcionarioData.senha) {
      funcionarioData.senha = await bcrypt.hash(funcionarioData.senha, 10);
    }
    
    Object.assign(funcionario, funcionarioData);
    return this.funcionarioRepository.save(funcionario);
  }

  async remove(id: string): Promise<void> {
    const funcionario = await this.findOne(id);
    funcionario.ativo = false;
    await this.funcionarioRepository.save(funcionario);
  }
}