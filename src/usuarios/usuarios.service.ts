import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Model } from 'mongoose';
import { encrypter } from 'src/core/encrypter';
import { UsuarioEntity } from 'src/entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create_usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel('Usuario') private readonly usuarioModel: Model<UsuarioEntity>,
  ) {}

  async fazerLogin(username: string, password: string): Promise<UsuarioEntity> {
    const encryptedPassword = encrypter(password);
    return await this.usuarioModel.findOne({
      username,
      password: encryptedPassword,
    });
  }

  async cadastrarUsuario(data: CreateUsuarioDto): Promise<UsuarioEntity> {
    return await this.usuarioModel.create(data);
  }

  async buscarUsuarioPorEmail(email: string): Promise<UsuarioEntity> {
    return await this.usuarioModel.findOne({ email });
  }

  async buscarUsuarioPorId(id: string): Promise<UsuarioEntity> {
    return await this.usuarioModel.findById(id);
  }
}
