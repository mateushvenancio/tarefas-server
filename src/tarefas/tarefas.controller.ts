import {
  Controller,
  Get,
  HttpException,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { CreateTarefaDto } from './dto/create_tarefa.dto';
import { Delete, Put } from '@nestjs/common/decorators';
import { TarefaEntity } from 'src/entities/tarefa.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { GetUserDto } from './dto/get-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('tarefas')
export class TarefasController {
  constructor(private tarefasService: TarefasService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getTarefasByUser(@GetUser() req: GetUserDto) {
    return await this.tarefasService.getByUserId(req.id);
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

  @Delete()
  async deleteTarefa(@Body() body) {
    const id = body.id;
    if (!id) {
      throw new HttpException('ID não informado', 404);
    }
    await this.tarefasService.deleteTarefa(id);
  }
}
