import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TarefasModule } from './tarefas/tarefas.module';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from './mongo/mongo.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, TarefasModule, MongoModule, UsuariosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
