import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { TarefaSchema } from 'src/mongo/schemes/tarefas.schema';
import { TarefasController } from './tarefas.controller';
import { TarefasService } from './tarefas.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tarefa', schema: TarefaSchema }]),
  ],
  controllers: [TarefasController],
  providers: [TarefasService],
})
export class TarefasModule {}
