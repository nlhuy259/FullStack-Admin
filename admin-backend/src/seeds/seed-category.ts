import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../modules/categories/schemas/category.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const categoryModel = app.get<Model<Category>>(
    getModelToken(Category.name),
  );

  await categoryModel.insertMany([
    { name: 'Drink', description: 'Beverages' },
    { name: 'Food', description: 'Main food' },
    { name: 'Snack', description: 'Snacks' },
    { name: 'Household', description: 'Home items' },
    { name: 'Personal Care', description: 'Body care' },
  ]);

  console.log('Seed done!');
  process.exit();
}

bootstrap();