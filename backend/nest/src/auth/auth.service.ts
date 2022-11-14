import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    const passwordsMatch = await bcrypt.compare(pass, user.password);
    if (!passwordsMatch) throw new ForbiddenException('Invalid credentials');

    const { password, ...result } = user;

    return result;
  }

  async login(user: User) {
    const payload = { ...user };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
