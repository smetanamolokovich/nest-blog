import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Blog } from './blog.model';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog) private blogRepository: typeof Blog) {}

  async create(dto: CreateBlogDto) {
    const article = await this.blogRepository.create(dto);
    return article;
  }

  async findAll() {
    const articles = await this.blogRepository.findAll();
    return articles;
  }

  async findOne(id: number) {
    const article = await this.blogRepository.findByPk(id);
    return article;
  }

  async update(id: number, dto: UpdateBlogDto) {
    const article = await this.blogRepository.update(
      {
        ...dto,
      },
      {
        where: { id },
      },
    );

    return article;
  }

  async remove(id: number) {
    return await this.blogRepository.destroy({ where: { id } });
  }
}
