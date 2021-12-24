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

  async create(userId: number, dto: CreateBlogDto, image: any) {
    if (userId) {
      let fileName: string;
      if (image) {
        fileName = await this.filesService.craeteFile(image);
      }

      const article = await this.blogRepository.create({
        ...dto,
        image: fileName,
        userId,
      });

      return article;
    }
  }

  async findAll() {
    const articles = await this.blogRepository.findAll();
    return articles;
  }

  async findOne(id: number) {
    const article = await this.blogRepository.findByPk(id);
    return article;
  }

  async update(id: number, dto: UpdateBlogDto, image: any) {
    let fileName: string;

    if (image) {
      fileName = await this.filesService.craeteFile(image);
    }

    const article = await this.blogRepository.update(
      {
        ...dto,
        image: fileName,
      },
      {
        where: { id },
        returning: true,
      },
    );

    return article;
  }

  async remove(id: number) {
    return await this.blogRepository.destroy({ where: { id } });
  }
}
