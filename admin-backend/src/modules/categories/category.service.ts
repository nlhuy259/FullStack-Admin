import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const exist = await this.categoryModel.findOne({ name: createCategoryDto.name });

  if (exist) { 
    throw new Error('Category already exists');
  }
    return this.categoryModel.create(createCategoryDto);
  }

  findAll() {
    return this.categoryModel.find().exec();
  }

  findOne(id: string) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
