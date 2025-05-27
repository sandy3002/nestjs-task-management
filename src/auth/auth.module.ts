import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret51',
      signOptions: {
        expiresIn: 3600,
      }
    })
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule { }
