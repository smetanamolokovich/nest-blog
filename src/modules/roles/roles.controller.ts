import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.create(createRoleDto);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get(':value')
  async findOne(@Param('value') value: string) {
    const role = await this.rolesService.getByValueName(value);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }
}
