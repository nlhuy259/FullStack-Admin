import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { CreateAuthDto } from './dto/create-auth.dto';
import { LocalAuthGuard } from './passport/local.auth.guard';
import { Public } from '@/decorator/customize';
import { CreateAuthDto } from './dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly mailerService: MailerService,) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  async logout(@Request() req) {
    return req.logout();
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('register')
  @Public()
  register(@Body() registerDto: CreateAuthDto) {
    return this.authService.handleRegister(registerDto);
  }

}