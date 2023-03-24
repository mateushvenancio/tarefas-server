import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TarefaEntity } from 'src/entities/tarefa.entity';
import { MongoTarefasService } from 'src/mongo/mongo-tarefas.service';
import { CreateTarefaDto } from './dto/create_tarefa.dto';

@Injectable()
export class TarefasService {
  constructor(private tarefaService: MongoTarefasService) {}

  async getByUserId(id: string): Promise<TarefaEntity[]> {
    return await this.tarefaService.getTarefasByUsuarioId(id);
  }

  async createTarefa(body: CreateTarefaDto): Promise<TarefaEntity> {
    return await this.tarefaService.createTarefa(body);
  }

  async deleteTarefa(id: string, userId: string): Promise<void> {
    const tarefa = await this.tarefaService.getTarefaById(id);
    if (!tarefa) return;
    if (tarefa.userId != userId) {
      throw new UnauthorizedException();
    }
    await this.tarefaService.deleteTarefa(id);
  }

  async updateTarefa(
    id: string,
    tarefa: TarefaEntity,
    userId: string,
  ): Promise<void> {
    const result = await this.tarefaService.getTarefaById(id);
    if (!result) return;
    if (result.userId != userId) {
      throw new UnauthorizedException();
    }
    await this.tarefaService.updateTarefa(id, tarefa);
  }
}
