import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type StoreDocument = HydratedDocument<Store>;

@Schema({ timestamps: true })
export class Store {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  phone: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  manager: Types.ObjectId ;

}
export const StoreSchema = SchemaFactory.createForClass(Store);
