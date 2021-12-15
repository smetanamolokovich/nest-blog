import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, type: [User] })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const [numberOfAffectedRows, updatedUser] = await this.userService.update(
      id,
      updateUserDto,
    );
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This user doesn't exist");
    }

    return updatedUser;
  }

  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.userService.remove(id);
    if (deleted === 0) {
      throw new NotFoundException("This user doesn't exist");
    }

    return 'Successfully deleted';
  }
}
