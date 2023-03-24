import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TarefaEntity } from 'src/entities/tarefa.entity';
import { CreateTarefaDto } from 'src/tarefas/dto/create_tarefa.dto';

@Injectable()
export class MongoTarefasService {
  constructor(
    @InjectModel('Tarefas') private readonly tarefasModel: Model<TarefaEntity>,
  ) {}
  async getTarefaById(id: string): Promise<TarefaEntity> {
    return await this.tarefasModel.findById(id);
  }

  async getTarefasByUsuarioId(id: string): Promise<TarefaEntity[]> {
    const user = await this.tarefasModel.find({ userId: id });
    return user;
  }

  async createTarefa(body: CreateTarefaDto): Promise<TarefaEntity> {
    const created = await this.tarefasModel.create({
      nome: body.nome,
      descricao: body.descricao,
      userId: body.userId,
    });
    return created;
  }

  async deleteTarefa(id: string): Promise<void> {
    await this.tarefasModel.findOneAndDelete({ _id: id });
  }

  async updateTarefa(id: string, tarefa: TarefaEntity): Promise<void> {
    await this.tarefasModel.findOneAndUpdate({ _id: id }, tarefa);
  }
}
