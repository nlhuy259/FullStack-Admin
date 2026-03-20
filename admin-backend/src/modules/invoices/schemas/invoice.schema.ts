import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type InvoiceDocument = HydratedDocument<Invoice>;

@Schema({ timestamps: true })
export class Invoice {
  @Prop({ type: Types.ObjectId, ref: 'Store' })
  storeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop([
    {
      productId: { type: Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      quantity: Number,
    },
  ])
  items: any[];

  @Prop()
  totalAmount: number;

  @Prop({ enum: ['paid', 'pending', 'cancelled'], default: 'paid' })
  status: string;
}
export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
