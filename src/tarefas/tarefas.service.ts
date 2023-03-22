import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Model } from 'mongoose';
import { TarefaEntity } from 'src/entities/tarefa.entity';
import { CreateTarefaDto } from './dto/create_tarefa.dto';

@Injectable()
export class TarefasService {
  constructor(
    @InjectModel('Tarefa') private readonly tarefaModel: Model<TarefaEntity>,
  ) {}

  async getByUserId(id: string): Promise<TarefaEntity[]> {
    return await this.tarefaModel.find({ userId: id });
  }

  async createTarefa(body: CreateTarefaDto): Promise<TarefaEntity> {
    const created = await this.tarefaModel.create({
      nome: body.nome,
      descricao: body.descricao,
      userId: body.userId,
    });
    return created;
  }

  async deleteTarefa(id: string): Promise<void> {
    await this.tarefaModel.findOneAndDelete({ _id: id });
  }

  async updateTarefa(id: string, tarefa: TarefaEntity): Promise<void> {
    await this.tarefaModel.findOneAndUpdate({ _id: id }, tarefa);
  }
}
