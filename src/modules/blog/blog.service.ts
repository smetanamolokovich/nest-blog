import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { Blog } from './blog.model';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog) private blogRepository: typeof Blog,
    private filesService: FilesService,
  ) {}

  async create(dto: CreateBlogDto, image: any) {
    const fileName = await this.filesService.craeteFile(image);
    const article = await this.blogRepository.create({
      ...dto,
      image: fileName,
    });

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
