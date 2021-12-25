import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
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
    const role = await this.roleService.getByValueName('user');

    await user.$set('roles', [role.id]);
    user.roles = [role];

    return user;
  }

  async findAll() {
    return await this.userRepository.findAll({
      include: { all: true },
      attributes: { exclude: ['password'] },
    });
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

  async getUsersByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getByValueName(dto.value);

    if (user && role) {
      await user.$add('role', role.id);
      return dto;
    }

    throw new HttpException('User or role not found.', HttpStatus.NOT_FOUND);
  }

  async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();

    return user;
  }
}
