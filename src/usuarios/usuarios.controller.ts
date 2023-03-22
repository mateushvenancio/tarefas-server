import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { validateEmail } from 'src/core/validateEmail';
import { CreateUsuarioDto } from './dto/create_usuario.dto';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuarioService: UsuariosService) {}

  @Post('/login')
  async fazerLogin(@Body() body) {
    const email = body.email;
    const senha = body.password;

    if (!email) {
      throw new HttpException('E-mail não informado', 400);
    }
    if (!senha) {
      throw new HttpException('Senha não informada', 400);
    }

    const usuario = await this.usuarioService.fazerLogin(email, senha);

    if (usuario) return usuario;
    else throw new HttpException('Usuário não encontrado', 404);
  }

  @Post('/cadastro')
  async fazerCadastro(@Body() body: CreateUsuarioDto) {
    if (!body.email) {
      throw new HttpException('E-mail não informado', 400);
    }
    if (!validateEmail(body.email)) {
      throw new HttpException('E-mail inválido', 400);
    }
    if (!body.nome) {
      throw new HttpException('Nome não informado', 400);
    }
    if (!body.password) {
      throw new HttpException('Senha não informada', 400);
    }
    const userByEmail = await this.usuarioService.buscarUsuarioPorEmail(
      body.email,
    );
    if (userByEmail) {
      throw new HttpException('E-mail já cadastrado', 409);
    }
    return await this.usuarioService.cadastrarUsuario(body);
  }
}
