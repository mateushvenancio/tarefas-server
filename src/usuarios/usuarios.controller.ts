import { Get, UseGuards, Put, Delete, Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetUserDto } from 'src/auth/dto/get-user.dto';
import { UsuariosService } from './usuarios.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuarioService: UsuariosService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  async getUsuario(@GetUser() req: GetUserDto) {
    return await this.usuarioService.getUsuarioById(req.id);
  }

  @UseGuards(JwtGuard)
  @Put('me')
  async updateUsuario(
    @GetUser() req: GetUserDto,
    @Body() body: UpdateUsuarioDto,
  ) {
    return await this.usuarioService.updateUsuario(req.id, body);
  }

  @UseGuards(JwtGuard)
  @Delete('me')
  async deleteUsuario(@GetUser() req: GetUserDto) {
    await this.usuarioService.deleteUsuario(req.id);
  }
}
