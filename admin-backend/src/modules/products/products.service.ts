import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CategoryService } from '../categories/category.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private categoriesService: CategoryService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const category = await this.categoriesService.findOne(createProductDto.categoryId);
  if (!category) {
    throw new Error('Category not found');
  }

    return this.productModel.create(createProductDto);
 }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
