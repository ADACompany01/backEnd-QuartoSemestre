import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrcamentoController } from './orcamento.controller';
import { OrcamentoService } from './orcamento.service';
import { Orcamento } from './orcamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orcamento])],
  controllers: [OrcamentoController],
  providers: [OrcamentoService],
  exports: [OrcamentoService],
})
export class OrcamentoModule {}