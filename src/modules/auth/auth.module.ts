import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from '../../shared/strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { jwtConfig } from 'src/config/jwt';
import { LocalStrategy } from 'src/shared/strategies/local.strategy';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
