import {
  Controller,
  Get,
  Param,
  HttpException,
  Post,
  Body,
} from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { CreateTarefaDto } from './dto/create_tarefa.dto';
import { Put } from '@nestjs/common/decorators';
import { TarefaEntity } from 'src/entities/tarefa.entity';

@Controller('tarefas')
export class TarefasController {
  constructor(private tarefasService: TarefasService) {}

  @Get('/:id')
  async getTarefasByUser(@Param('id') id: string) {
    if (!id) {
      throw new HttpException('ID não informado', 400);
    }
    return await this.tarefasService.getByUserId(id);
  }

  @Post()
  async createTarefa(@Body() body: CreateTarefaDto) {
    if (!body.nome) {
      throw new HttpException('Nome não informado', 400);
    }
    if (!body.descricao) {
      throw new HttpException('Descrição não informada', 400);
    }

    body.userId = '111222333';

    return await this.tarefasService.createTarefa(body);
  }

  @Put()
  async updateTarefa(@Body() body: TarefaEntity) {
    const id = body.id;

    if (!id) {
      throw new HttpException('A tarefa não possui um ID', 400);
    }

    // properties i dont want to update
    delete body.id;
    delete body.userId;
    delete body.data;

    await this.tarefasService.updateTarefa(id, body);
  }
}
