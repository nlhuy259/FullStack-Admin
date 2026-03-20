import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory } from '../modules/inventories/schemas/inventory.schema';
import { Product } from '../modules/products/schemas/product.schema';
import { Store } from '../modules/stores/schemas/store.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const inventoryModel = app.get<Model<Inventory>>(
    getModelToken(Inventory.name),
  );
  const productModel = app.get<Model<Product>>(getModelToken(Product.name));
  const storeModel = app.get<Model<Store>>(getModelToken(Store.name));

  const products = await productModel.find();
  const stores = await storeModel.find();

  await inventoryModel.insertMany([
    {
      productId: products[0]._id,
      storeId: stores[0]._id,
      quantity: 100,
      type: 'import',
    },
    {
      productId: products[1]._id,
      storeId: stores[0]._id,
      quantity: 50,
      type: 'import',
    },
  ]);

  console.log('✅ Seed inventory done');
  process.exit();
}

bootstrap();