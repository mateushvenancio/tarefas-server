import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TarefasModule } from './tarefas/tarefas.module';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from './mongo/mongo.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, TarefasModule, MongoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
