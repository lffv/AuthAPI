import { Request, Response, NextFunction } from 'express';
import { validateJwt } from '../utils/jwt';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = (req.headers.authorization || '').replace(
    /^Bearer\s/,
    '',
  );

  if (!accessToken) {
    return next();
  }

  const decoded = validateJwt(accessToken, 'accessTokenPublicKey');

  if (decoded) {
    res.locals.user = decoded;
  }

  next();
};

export default deserializeUser;
