import { IsEnum, IsMongoId } from 'class-validator';

export enum Role {
  STAFF = 'staff',
  MANAGER = 'manager',
  OWNER = 'owner',
}

export class CreateUserStoreDto {
  @IsMongoId()
  userId: string;

  @IsMongoId()
  storeId: string;

  @IsEnum(Role)
  role: Role;
}
