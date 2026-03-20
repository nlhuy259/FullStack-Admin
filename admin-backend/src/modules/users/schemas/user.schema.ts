import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required: true})
  name: string;

  @Prop({required: true})
  email: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ enum: ['manager', 'staff', 'client'], default: 'client' })
  role: 'manager' | 'staff' | 'client';

  @Prop({ default: false})
  isVerified: boolean;

  @Prop()
  codeId: string;

  @Prop()
  codeExpired: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
