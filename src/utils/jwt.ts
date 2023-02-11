import config from 'config';
import jwt from 'jsonwebtoken';

export function signJwt(
  object: Object,
  keyname: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: jwt.SignOptions | undefined,
) {
  const signKey = Buffer.from(config.get<string>(keyname), 'base64').toString(
    'ascii',
  );

  return jwt.sign(object, signKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export function validateJwt<T>(
  token: string,
  keyname: 'accessTokenPublicKey' | 'refreshTokenPublicKey',
): T | null {
  const publicKey = Buffer.from(config.get<string>(keyname), 'base64').toString(
    'ascii',
  );

  try {
    const decoded = jwt.verify(token, publicKey) as T;

    return decoded;
  } catch (error: any) {
    return null;
  }
}
