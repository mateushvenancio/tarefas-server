import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { TarefasModule } from './tarefas/tarefas.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECT),
    UsuariosModule,
    AuthModule,
    TarefasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
