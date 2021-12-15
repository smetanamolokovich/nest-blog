import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @Post()
  async create(@Body() createBlogDto: CreateBlogDto) {
    return await this.blogService.create(createBlogDto);
  }

  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, type: [Blog] })
  @Get()
  async findAll() {
    return await this.blogService.findAll();
  }

  @ApiOperation({ summary: 'Get post by id' })
  @ApiResponse({ status: 200, type: Blog })
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
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateBlogDto: UpdateBlogDto) {
    const [numberOfAffectedRows, updatedPost] = await this.blogService.update(
      id,
      updateBlogDto,
    );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    return updatedPost;
  }

  @ApiOperation({ summary: 'Delete post by id' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.blogService.remove(id);
    if (deleted === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    return 'Successfully deleted';
  }
}
