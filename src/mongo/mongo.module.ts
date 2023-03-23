import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoTarefasService } from './mongo-tarefas.service';
import { MongoUsuariosService } from './mongo-usuarios.service';
import { TarefaSchema } from './schemes/tarefas.schema';
import { UsuarioSchema } from './schemes/usuario.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGO_CONNECT'),
      }),
    }),
    MongooseModule.forFeature([
      {
        name: 'Usuarios',
        schema: UsuarioSchema,
        collection: 'usuarios',
      },
      {
        name: 'Tarefas',
        schema: TarefaSchema,
        collection: 'tarefas',
      },
    ]),
  ],
  providers: [MongoTarefasService, MongoUsuariosService],
})
export class MongoModule {}
