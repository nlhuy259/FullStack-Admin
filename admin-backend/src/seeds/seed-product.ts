import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../modules/products/schemas/product.schema';
import { Category } from '../modules/categories/schemas/category.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const productModel = app.get<Model<Product>>(getModelToken(Product.name));
  const categoryModel = app.get<Model<Category>>(getModelToken(Category.name));

  const categories = await categoryModel.find();

  await productModel.insertMany([
    {
      name: 'Coca',
      price: 10000,
      cost: 5000,
      categoryId: categories[0]._id,
    },
    {
      name: 'Burger',
      price: 50000,
      cost: 25000,
      categoryId: categories[1]._id,
    },
  ]);

  console.log('✅ Seed product done');
  process.exit();
}

bootstrap();