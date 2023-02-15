import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
  index,
  Ref,
} from '@typegoose/typegoose';
import UserModel, { User } from './user.model';


@index({ name: 1, user: 1 }, { unique: true })

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})

export class Avatar {
  @prop({ required: true })
  name: string;

  @prop()
  history: string;

  @prop()
  fatherName: string;

  @prop()
  motherName: string;

  @prop()
  country: string;

  @prop()
  image: string;

  @prop({ default: false })
  published: boolean;

  @prop({ ref: () => User })
  public user?: Ref<User>;
}
