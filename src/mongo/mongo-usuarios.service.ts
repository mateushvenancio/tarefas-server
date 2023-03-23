import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsuarioEntity } from 'src/entities/usuario.entity';

@Injectable()
export class MongoUsuariosService {
  constructor(
    @InjectModel('Usuarios')
    private readonly usuarioModel: Model<UsuarioEntity>,
  ) {}
  async getUsuarioById(id: string): Promise<UsuarioEntity> {
    const user = await this.usuarioModel.findById(id);
    return user;
  }

  async getUsuarioByEmail(email: string): Promise<UsuarioEntity> {
    const user = await this.usuarioModel.findOne({ email });
    return user;
  }
}
