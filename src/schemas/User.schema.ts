import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';

const schemaOptions: SchemaOptions = {
  timestamps: true,
  versionKey: false,
};

@Schema(schemaOptions)
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true })
  role: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true, select: false })
  password: string;
  @Prop({ required: false })
  profileImg?: string;
  @Prop({ required: false })
  bio?: string;
  @Prop({ required: false })
  dob?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
