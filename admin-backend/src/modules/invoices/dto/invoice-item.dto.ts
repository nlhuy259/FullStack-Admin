import { IsMongoId, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class InvoiceItemDto {
  @IsMongoId()
  productId: string;

  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}