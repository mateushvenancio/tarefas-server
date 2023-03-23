import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TarefaEntity } from 'src/entities/tarefa.entity';

@Injectable()
export class MongoTarefasService {
  constructor(
    @InjectModel('Tarefas') private readonly tarefasModel: Model<TarefaEntity>,
  ) {}
  async getTarefasByUsuarioId(id: string): Promise<TarefaEntity[]> {
    const user = await this.tarefasModel.find({ userId: id });
    return user;
  }
}
