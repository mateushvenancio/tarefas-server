import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { TarefasSchema } from 'src/schemes/tarefas.schema';
import { TarefasController } from './tarefas.controller';
import { TarefasService } from './tarefas.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tarefa', schema: TarefasSchema }]),
  ],
  controllers: [TarefasController],
  providers: [TarefasService],
})
export class TarefasModule {}
