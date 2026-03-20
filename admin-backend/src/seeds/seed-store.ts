import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store } from '../modules/stores/schemas/store.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const storeModel = app.get<Model<Store>>(getModelToken(Store.name));

  await storeModel.insertMany([
    {
      name: 'Store A',
      address: 'HCM City',
    },
    {
      name: 'Store B',
      address: 'Ha Noi',
    },
  ]);

  console.log('✅ Seed store done');
  process.exit();
}

bootstrap();