import { IsOptional, IsString, IsEmail, IsBoolean, IsIn, IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsMongoId({message: 'Invalid userId' })
  @IsNotEmpty({message: 'userId is required' })
  _id: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;

  @IsOptional()
  isVerified: boolean;
}