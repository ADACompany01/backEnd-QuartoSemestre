import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';
import { Servico } from '../servico/servico.entity';

@Entity()
export class Orcamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dataServico: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  valorTotal: number;

  @Column({
    type: 'enum',
    enum: ['AGUARDANDO', 'APROVADO', 'REPROVADO', 'FINALIZADO'],
    default: 'AGUARDANDO'
  })
  status: string;

  @Column({ nullable: true })
  observacoes: string;

  @Column({ default: true })
  ativo: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataCriacao: Date;

  @ManyToOne(() => Cliente, cliente => cliente.orcamentos)
  @JoinColumn()
  cliente: Cliente;

  @ManyToOne(() => Servico, servico => servico.orcamentos)
  @JoinColumn()
  servico: Servico;
}