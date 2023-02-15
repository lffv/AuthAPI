import { Request, Response } from 'express';
import { CreateAvatarInput, GetAvatarInput } from '../schema/avatar.schema';
import { createAvatar, findAvatar } from '../service/avatar.service';

export async function createAvatarHandler(
  req: Request<{}, {}, CreateAvatarInput>,
  res: Response,
) {
  const { body } = req;
  try {
    const avatarData = {
      name: body.firstName + body.lastName,
      history: body.origins
    };
    const user = res.locals.user;
    const avatar = await createAvatar(avatarData, user);

    return res.send('Avatar created!');
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send('Avatar already exists');
    }
    return res.status(500).send(e);
  }
}

export async function getAvatarHandler(
  req: Request<GetAvatarInput>,
  res: Response,
) {
  const { avatarId, userId } = req.params;

  try {
    const avatars = await findAvatar(avatarId, userId);

    return res.status(200).send(avatars);
  } catch (e: any) {
    return res.status(500).send(e);
  }
}
