import { Table, Column, Model, DataType, HasOne } from 'sequelize-typescript';
import { Cliente } from './cliente.entity';
import { Funcionario } from './funcionario.entity';

@Table({ tableName: 'usuarios' })
export class Usuario extends Model<Usuario> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id_usuario',
  })
  id_usuario: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'nome_completo',
  })
  nome_completo: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'telefone',
  })
  telefone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    field: 'email',
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'senha',
  })
  senha: string;

  @HasOne(() => Cliente)
  cliente: Cliente;

  @HasOne(() => Funcionario)
  funcionario: Funcionario;

  // Relacionamentos serão definidos nas entidades Cliente e FuncionarioADA
} 