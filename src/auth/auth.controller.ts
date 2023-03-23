import { Controller, Post, Body } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async fazerLogin(@Body() body) {
    if (!body.email || !body.password) {
      throw new HttpException('E-mail ou senha inválidos', 400);
    }
    const token = await this.authService.fazerLogin(body.email, body.password);
    return token;
  }

  @Post('signup')
  async register(@Body() body: AuthDto) {
    return await this.authService.fazerCadastro(body);
  }
}
