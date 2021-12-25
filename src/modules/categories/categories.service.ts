import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private categoriesRepository: typeof Category,
  ) {}

  async create(dto: CreateCategoryDto) {
    return await this.categoriesRepository.create(dto);
  }

  async findAll() {
    return await this.categoriesRepository.findAll();
  }

  async findOne(id: number) {
    return await this.categoriesRepository.findOne({ where: { id } });
  }

  async findByName(name: string) {
    return await this.categoriesRepository.findOne({ where: { name } });
  }

  async update(id: number, dto: UpdateCategoryDto) {
    return await this.categoriesRepository.update(
      { ...dto },
      { where: { id } },
    );
  }

  async remove(id: number) {
    return await this.categoriesRepository.destroy({
      where: { id },
      cascade: true,
    });
  }
}
