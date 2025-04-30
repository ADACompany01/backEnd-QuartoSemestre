import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicoController } from './servico.controller';
import { ServicoService } from './servico.service';
import { Servico } from './servico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Servico])],
  controllers: [ServicoController],
  providers: [ServicoService],
  exports: [ServicoService],
})
export class ServicoModule {}