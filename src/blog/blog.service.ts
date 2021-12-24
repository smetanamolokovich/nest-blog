import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { Blog } from './blog.model';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { SlugProvider } from './slug.provider';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog) private blogRepository: typeof Blog,
    private filesService: FilesService,
    private slugProvider: SlugProvider,
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
        slug: await this.slugify(dto.title.trim()),
      });

      return article;
    }
  }

  async findAll() {
    return await this.blogRepository.findAll();
  }

  async findOne(id: number) {
    return await this.blogRepository.findByPk(id);
  }

  async update(id: number, dto: UpdateBlogDto, image: any) {
    let slug: string, fileName: string;

    if (image) {
      fileName = await this.filesService.craeteFile(image);
    }
    if (dto.title) {
      slug = await this.slugify(dto.title.trim());
    }

    const article = await this.blogRepository.update(
      {
        ...dto,
        image: fileName,
        slug,
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

  private async slugify(title: string) {
    let slug = this.slugProvider.genSlug(title);

    const exists = await this.findSlugs(slug);

    // if slug doesn't already exists
    if (!exists || exists.length === 0) {
      return slug.trim();
    }

    // Add to suffix
    slug = slug + '_' + exists.length;

    return slug.trim();
  }

  private async findSlugs(slug: string): Promise<Blog[]> {
    return await this.blogRepository.findAll({
      where: {
        slug,
      },
    });
  }
}
