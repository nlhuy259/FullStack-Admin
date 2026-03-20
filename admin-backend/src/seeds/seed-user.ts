import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../modules/users/schemas/user.schema';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userModel = app.get<Model<User>>(getModelToken(User.name));

  const users = [
    {
      name: 'Manager',
      email: 'manager@gmail.com',
      password: await bcrypt.hash('123456', 10),
      role: 'manager',
    },
    {
      name: 'Staff',
      email: 'staff@gmail.com',
      password: await bcrypt.hash('123456', 10),
      role: 'staff',
    },
  ];

  await userModel.insertMany(users);

  console.log('✅ Seed user done');
  process.exit();
}

bootstrap();