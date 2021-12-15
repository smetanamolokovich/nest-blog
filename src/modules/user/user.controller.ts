import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('User')
@Controller('api/users')
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
  @Roles('admin')
  @UseGuards(RolesGuard)
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
  @Put(':id')
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
