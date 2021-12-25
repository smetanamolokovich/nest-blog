import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Blog } from './blog.model';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@ApiTags('Blog')
@Controller('api/blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @ApiOperation({ summary: 'Create new post' })
  @ApiResponse({ status: 201, type: Blog })
  @Roles('user')
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(
    @Req() req: any,
    @Body() dto: CreateBlogDto,
    @UploadedFile() image?: any,
  ) {
    const userId = req.user.id;
    const post = await this.blogService.create(userId, dto, image);
    if (!post) {
      throw new HttpException(
        'Error occured while creating new post',
        HttpStatus.BAD_REQUEST,
      );
    }

    return post;
  }

  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, type: [Blog] })
  @Roles('user')
  @UseGuards(RolesGuard)
  @Get()
  async findAll() {
    return await this.blogService.findAll();
  }

  @ApiOperation({ summary: 'Get post by id' })
  @ApiResponse({ status: 200, type: Blog })
  @Roles('user')
  @UseGuards(RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const article = await this.blogService.findOne(id);
    if (!article) {
      throw new NotFoundException('Post not found.');
    }
    return article;
  }

  @ApiOperation({ summary: 'Update post by id' })
  @ApiResponse({ status: 200, type: [Blog] })
  @Roles('user')
  @UseGuards(RolesGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateBlogDto,
    @UploadedFile() image?: any,
  ) {
    const [numberOfAffectedRows, updatedPost] = await this.blogService.update(
      id,
      dto,
      image,
    );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    return updatedPost;
  }

  @ApiOperation({ summary: 'Delete post by id' })
  @ApiResponse({ status: 200 })
  @Roles('user')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.blogService.remove(id);
    if (deleted === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    return 'Successfully deleted';
  }
}
