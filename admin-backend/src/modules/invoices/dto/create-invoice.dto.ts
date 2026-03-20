import { IsArray, IsMongoId, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { InvoiceItemDto } from './invoice-item.dto';
export class CreateInvoiceDto {
  @IsMongoId()
  storeId: string;

  @IsMongoId()
  createdBy: string;

  @IsNotEmpty()
  customerName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items: InvoiceItemDto[];
}
