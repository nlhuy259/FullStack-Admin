import { Module } from '@nestjs/common';
import { UserStoreService } from './user-store.service';
import { UserStoreController } from './user-store.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserStore, UserStoreSchema } from './schemas/user-store.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserStore.name, schema: UserStoreSchema }])],
  controllers: [UserStoreController],
  providers: [UserStoreService],
})
export class UserStoreModule {}
