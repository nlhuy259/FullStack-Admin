import { Injectable } from '@nestjs/common';
import { CreateUserStoreDto } from './dto/create-user-store.dto';
import { UpdateUserStoreDto } from './dto/update-user-store.dto';

@Injectable()
export class UserStoreService {
  create(createUserStoreDto: CreateUserStoreDto) {
    return 'This action adds a new userStore';
  }

  findAll() {
    return `This action returns all userStore`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userStore`;
  }

  update(id: number, updateUserStoreDto: UpdateUserStoreDto) {
    return `This action updates a #${id} userStore`;
  }

  remove(id: number) {
    return `This action removes a #${id} userStore`;
  }
}
