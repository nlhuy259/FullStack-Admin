import { IsEnum, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export enum InventoryType {
  IMPORT = 'import',
  EXPORT = 'export',
  ADJUST = 'adjust',
}
export class CreateInventoryDto {
  @IsMongoId()
  productId: string;

  @IsMongoId()
  storeId: string;

  @IsEnum(InventoryType)
  type: InventoryType;

  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  note: string;

  @IsMongoId()
  createdBy: string;
}
