import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDto } from './create-invoice.dto';
import { IsOptional, IsEnum } from 'class-validator';

export enum InvoiceStatus {
  PAID = 'paid',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
}

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {
  @IsOptional()
  @IsEnum(InvoiceStatus)
  status?: InvoiceStatus;
}
