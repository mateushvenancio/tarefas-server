import { Module } from '@nestjs/common';
import { MongoModule } from 'src/mongo/mongo.module';
import { TarefasController } from './tarefas.controller';
import { TarefasService } from './tarefas.service';

@Module({
  imports: [MongoModule],
  controllers: [TarefasController],
  providers: [TarefasService],
})
export class TarefasModule {}
