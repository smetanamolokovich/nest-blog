import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Category } from '../categories/categories.model';
import { CategoriesService } from '../categories/categories.service';
import { FilesService } from '../files/files.service';
import { User } from '../user/user.model';
import { Blog } from './blog.model';
import { CreateBlogDto } from './dto/create-blog.dto';
import { PaginationParams } from './dto/pagination-params.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { SlugProvider } from './slug.provider';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog) private blogRepository: typeof Blog,
    private filesService: FilesService,
    private categoriesService: CategoriesService,
    private slugProvider: SlugProvider,
  ) {}

  async create(userId: number, dto: CreateBlogDto, image: any) {
    const categories = dto.categories
      ? await this.handleCategories(dto.categories)
      : [];

    if (userId) {
      let fileName = image ? await this.filesService.craeteFile(image) : null;

      const post = await this.blogRepository.create({
        ...dto,
        image: fileName,
        userId,
        slug: await this.slugify(dto.title.trim()),
        categories,
      });
      await post.$set('categories', categories);

      return post;
    }
  }

  async findAll(queryParams: PaginationParams) {
    const { limit, offset } = queryParams;

    return await this.blogRepository.findAndCountAll({
      include: [
        {
          model: User,
          attributes: ['email'],
        },
        {
          model: Category,
          attributes: ['name'],
        },
      ],
      limit,
      offset,
    });
  }

  async findOne(id: number) {
    return await this.blogRepository.findByPk(id);
  }

  async update(id: number, dto: UpdateBlogDto, image: any) {
    let slug: string, fileName: string;
    const categories = dto.categories
      ? await this.handleCategories(dto.categories)
      : [];

    if (image) {
      fileName = await this.filesService.craeteFile(image);
    }
    if (dto.title) {
      slug = await this.slugify(dto.title.trim());
    }

    const post = await this.blogRepository.update(
      {
        ...dto,
        image: fileName,
        slug,
        categories,
      },
      {
        where: { id },
        returning: true,
      },
    );

    return post;
  }

  async remove(id: number) {
    return await this.blogRepository.destroy({ where: { id }, cascade: true });
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

  private async handleCategories(categoriesString: string) {
    let result = [];
    const categories = categoriesString.split(',');
    categories.forEach((c) => {
      result.push(this.categoriesService.findByName(c.trim()));
    });

    return await Promise.all<Category[]>(result);
  }
}
