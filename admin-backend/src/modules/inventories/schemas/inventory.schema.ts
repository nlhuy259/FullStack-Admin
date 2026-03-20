import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema({ timestamps: true })
export class Inventory {
  @Prop({ type: Types.ObjectId, ref: 'Product' })
  productId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Store' })
  storeId: Types.ObjectId;

  @Prop({ enum: ['import', 'export'] })
  type: string;

  @Prop()
  quantity: number;

  @Prop()
  note: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}
export const InventorySchema = SchemaFactory.createForClass(Inventory);
