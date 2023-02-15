import { getModelForClass } from "@typegoose/typegoose";
import { Avatar } from "./avatar.model";
import { User } from "./user.model";

export const UserModel = getModelForClass(User);
export const AvatarModel = getModelForClass(Avatar);
