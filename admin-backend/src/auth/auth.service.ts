import { comparePasswordHelper } from '@/helper/util';
import { UsersService } from '@/modules/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser( email: string, password: string ): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isValidPassword = await comparePasswordHelper(password, user.password);

    if (!isValidPassword) {
      return null;
    }

    return user;
  }
  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  handleRegister = async(registerDto: CreateAuthDto) => {
    return await this.usersService.handleRegister(registerDto);
  }
}
