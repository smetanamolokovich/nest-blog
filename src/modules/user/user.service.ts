import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from '../roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.findOne('user');

    await user.$set('roles', [role.id]);

    return user;
  }

  async findAll() {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    return await this.userRepository.update(
      {
        ...dto,
      },
      { where: { id } },
    );
  }

  async remove(id: number) {
    return await this.userRepository.destroy({ where: { id } });
  }
}
