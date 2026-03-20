import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersModule } from '@/modules/users/users.module';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { JwtStrategy } from './passport/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
  useFactory: (config: ConfigService) => ({
    global: true,
    secret: config.get<string>('JWT_SECRET')!,
    signOptions: {
      expiresIn: config.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN') as any,
    },
  }),
  inject: [ConfigService],
}),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
