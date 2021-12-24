import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);

    return await this.generateToken(user);
  }

  async register(dto: CreateUserDto) {
    const candidate = await this.userService.getUsersByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        'User with this email already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const newUser = await this.userService.create({
      ...dto,
      password: hashPassword,
    });

    return this.generateToken(newUser);
  }

  async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    };

    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getUsersByEmail(dto.email);

    if (user) {
      const isPasswordMatch = await bcrypt.compare(dto.password, user.password);

      if (isPasswordMatch) {
        return user;
      }
    } else {
      throw new HttpException(
        'Error while logging in.',
        HttpStatus.BAD_REQUEST,
      );
    }

    throw new UnauthorizedException({
      messsage: 'Incorrect user creadentials.',
    });
  }
}
