import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MongoModule } from 'src/mongo/mongo.module';
import { TarefasController } from './tarefas.controller';
import { TarefasService } from './tarefas.service';

@Module({
  imports: [MongoModule, AuthModule],
  controllers: [TarefasController],
  providers: [TarefasService],
})
export class TarefasModule {}
