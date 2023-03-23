import { Controller, Post } from '@nestjs/common';

@Controller()
export class AuthController {
  @Post('login')
  login() {
    return 'login';
  }
  @Post('signup')
  register() {
    return 'signup';
  }
}
