import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.create(createRoleDto);
  }

  @Get(':value')
  async findOne(@Param('value') value: string) {
    const role = await this.rolesService.getByValueName(value);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }
}
