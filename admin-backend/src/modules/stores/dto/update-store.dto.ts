import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreDto } from './create-store.dto';
import { IsOptional } from 'class-validator';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
  @IsOptional()
  name?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  phone?: string;
}
