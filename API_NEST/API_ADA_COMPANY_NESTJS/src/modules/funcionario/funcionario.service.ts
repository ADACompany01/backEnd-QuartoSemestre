import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Funcionario } from '../../database/entities/funcionario.entity';
import { Usuario } from '../../database/entities/usuario.entity';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FuncionarioService {
  private readonly logger = new Logger(FuncionarioService.name);
  
  constructor(
    @InjectModel(Funcionario)
    private funcionarioModel: typeof Funcionario,
    @InjectModel(Usuario)
    private usuarioModel: typeof Usuario,
  ) {}

  async create(createFuncionarioDto: CreateFuncionarioDto): Promise<Funcionario> {
    // Verifica se já existe usuário com o mesmo email
    const usuarioExistente = await this.usuarioModel.findOne({ where: { email: createFuncionarioDto.email } });
    if (usuarioExistente) {
      throw new ConflictException('Já existe um usuário com este email');
    }

    // Cria o usuário
    const senhaHash = await bcrypt.hash(createFuncionarioDto.senha, 10);
    const usuario = await this.usuarioModel.create({
      nome_completo: createFuncionarioDto.nome_completo,
      email: createFuncionarioDto.email,
      telefone: createFuncionarioDto.telefone,
      senha: senhaHash,
    });

    // Cria o funcionário vinculado ao usuário
    return this.funcionarioModel.create({
      nome_completo: createFuncionarioDto.nome_completo,
      email: createFuncionarioDto.email,
      telefone: createFuncionarioDto.telefone,
      id_usuario: usuario.id_usuario,
    });
  }

  async findAll(): Promise<Funcionario[]> {
    return this.funcionarioModel.findAll({
      include: [Usuario],
    });
  }

  async findOne(id: number): Promise<Funcionario> {
    const funcionario = await this.funcionarioModel.findByPk(id, {
      include: [Usuario],
    });
    if (!funcionario) {
      throw new NotFoundException('Funcionário não encontrado');
    }
    return funcionario;
  }

  async findByEmail(email: string): Promise<Funcionario> {
    const funcionario = await this.funcionarioModel.findOne({
      where: { email },
      include: [Usuario],
    });
    if (!funcionario) {
      throw new NotFoundException('Funcionário não encontrado');
    }
    return funcionario;
  }

  async findByEmailWithoutException(email: string): Promise<Funcionario | null> {
    return this.funcionarioModel.findOne({
      where: { email },
      include: [Usuario],
    });
  }

  async update(id: number, updateFuncionarioDto: UpdateFuncionarioDto): Promise<Funcionario> {
    const funcionario = await this.findOne(id);
    
    if (updateFuncionarioDto.id_usuario) {
      const usuario = await this.usuarioModel.findByPk(updateFuncionarioDto.id_usuario);
      if (!usuario) {
        throw new NotFoundException('Usuário não encontrado');
      }
    }

    await funcionario.update(updateFuncionarioDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const funcionario = await this.findOne(id);
    await funcionario.destroy();
  }
}