import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from 'src/entities/usuario.entity';
import { MongoUsuariosService } from 'src/mongo/mongo-usuarios.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private usuariosMongo: MongoUsuariosService) {}

  async getUsuarioById(id: string): Promise<UsuarioEntity> {
    return await this.usuariosMongo.getUsuarioById(id);
  }

  async updateUsuario(
    id: string,
    body: UpdateUsuarioDto,
  ): Promise<UsuarioEntity> {
    const user = await this.usuariosMongo.updateUsuario(id, body);
    return user;
  }

  async deleteUsuario(id: string): Promise<void> {
    await this.usuariosMongo.deleteUsuario(id);
  }
}
