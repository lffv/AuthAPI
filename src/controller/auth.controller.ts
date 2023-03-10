import { Request, Response } from 'express';
import { get } from 'lodash';
import { CreateSessionInput } from '../schema/auth.schema';
import {
  findSessionById,
  signAccessToken,
  signRefreshToken,
} from '../service/auth.service';
import { findUserByEmail, findUserById } from '../service/user.service';
import { validateJwt } from '../utils/jwt';

export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionInput>,
  res: Response,
) {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  const message = 'Invalid email or password';
  if (!user) return res.send(message);

  if (!user.verified) return res.send('Please verify your email');
  const isValid = await user.validatePassword(password);

  if (!isValid) return res.send(message);

  const accessToken = signAccessToken(user);
  const refreshToken = await signRefreshToken({ userId: user._id });

  return res.send({
    accessToken,
    refreshToken,
  });
}

export async function refreshAccessTokenHandler(req: Request, res: Response) {
  const refreshToken = get(req, 'headers.x-refresh') as string;

  const decoded = validateJwt<{ session: string }>(
    refreshToken,
    'refreshTokenPublicKey',
  );

  if (!decoded) {
    return res.status(401).send('Could not refresh');
  }

  const session = await findSessionById(decoded.session);

  if (!session || !session.valid) {
    return res.status(401).send('Could not refresh');
  }

  const user = await findUserById(String(session.user));

  if (!user) {
    return res.status(401).send('Could not refresh');
  }

  const accessToken = signAccessToken(user);

  return res.send({ accessToken });
}
