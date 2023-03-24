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

  @UseGuards(JwtGuard)
  @Post()
  async createTarefa(
    @Body() body: CreateTarefaDto,
    @GetUser() req: GetUserDto,
  ) {
    body.userId = req.id;
    return await this.tarefasService.createTarefa(body);
  }

  @UseGuards(JwtGuard)
  @Put()
  async updateTarefa(@Body() body: TarefaEntity, @GetUser() req: GetUserDto) {
    const id = body.id;

    delete body.id;
    delete body.userId;
    delete body.data;

    await this.tarefasService.updateTarefa(id, body, req.id);
  }

  @UseGuards(JwtGuard)
  @Delete()
  async deleteTarefa(@Body() body, @GetUser() req: GetUserDto) {
    const id = body.id;
    if (!id) {
      throw new HttpException('ID não informado', 404);
    }
    await this.tarefasService.deleteTarefa(id, req.id);
  }
}
