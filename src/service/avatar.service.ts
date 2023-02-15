import { Avatar } from '../model/avatar.model';
import { AvatarModel } from '../model/models';
import { User } from '../model/user.model';
import log from '../utils/logger';
import { generateKeywords, generateResponse } from './chat.service';
import { generateImage } from './image.service';
import { createImageResume, createIntroduction } from './sentences.service';

export async function createAvatar(input: Partial<Avatar>, user: User) {
  const history = await generateResponse(createIntroduction(input));
  input.history = history?.choices[0].text || "";
  const keywords = await generateKeywords(input.history, "get the main ideias by topics to draw a caracter.");
  console.log(keywords);

  const image = await generateImage(createImageResume(input, keywords?.choices[0].text || ""));
  input.image = image?.data[0].b64_json;
  input.user = user;
  // return AvatarModel.create(input);
}

export function updateAvatar(id: string, input: Partial<Avatar>) {
  return AvatarModel.findByIdAndUpdate(id, input, { new: true });
}

export function findAvatarById(id: string) {
  return AvatarModel.findById(id);
}

export function findAvatar(avatarId: string, userId: string) {
  return avatarId ? findAvatarById(avatarId) : findAvatarsByUser(userId);
}

export function findAvatarsByUser(userId: string) {
  return AvatarModel.find({user: userId});
}
