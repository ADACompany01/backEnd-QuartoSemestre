import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Servico } from '../servico/servico.entity';

@Entity()
export class Funcionario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  cpf: string;

  @Column()
  cargo: string;

  @Column()
  especialidade: string;

  @Column()
  senha: string;

  @Column({ default: true })
  ativo: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataCriacao: Date;

  @OneToMany(() => Servico, servico => servico.funcionario)
  servicos: Servico[];
}