import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongoModule } from 'src/mongo/mongo.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [ConfigModule.forRoot(), JwtModule.register({}), MongoModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
