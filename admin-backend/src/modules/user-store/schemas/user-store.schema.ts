import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserStoreDocument = HydratedDocument<UserStore>;

export enum Role {
  STAFF = 'staff',
  MANAGER = 'manager',
  OWNER = 'owner',
}

@Schema({ timestamps: true })
export class UserStore {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Store' })
  storeId: Types.ObjectId;

  @Prop({ enum: Role })
  role: Role;
}
export const UserStoreSchema = SchemaFactory.createForClass(UserStore);
