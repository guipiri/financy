import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';
import { env } from '../env';

export type JwtPayload = {
  id: string;
  email: string;
};

export const signJwt = (
  payload: JwtPayload,
  expiresIn?: number | SignOptions['expiresIn'],
) => {
  const secret: Secret = env.JWT_SECRET;
  const expiresInEnv = expiresIn ?? env.JWT_EXPIRES_IN;

  return jwt.sign(payload, secret, { expiresIn: expiresInEnv });
};

export const verifyJwt = (token: string) => {
  const secret: Secret = env.JWT_SECRET;
  return jwt.verify(token, secret);
};
