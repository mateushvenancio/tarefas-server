import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as argon from 'argon2';
import { MongoUsuariosService } from 'src/mongo/mongo-usuarios.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private configService: ConfigService,
    private usuariosService: MongoUsuariosService,
  ) {}

  async fazerLogin(
    email: string,
    senha: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usuariosService.getUsuarioByEmail(email);
    if (!user) {
      throw new HttpException('Login inválido', 400);
    }
    if (!(await argon.verify(user.password, senha))) {
      throw new HttpException('Login inválido', 400);
    }
    return await this.signToken(user.id, user.email);
  }

  async fazerCadastro(dados: AuthDto): Promise<{ access_token: string }> {
    const user = await this.usuariosService.getUsuarioByEmail(dados.email);
    if (user) {
      throw new HttpException('Este e-mail já está em uso', 400);
    }
    const result = await this.usuariosService.createUsuario({
      ...dados,
      password: await argon.hash(dados.password),
    });
    return await this.signToken(result.id, result.email);
  }

  async signToken(
    id: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const data = {
      sub: id,
      email,
    };

    const secret = this.configService.get('JWT_SECRET');

    return { access_token: await this.jwt.signAsync(data, { secret }) };
  }
}
