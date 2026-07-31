import type { ExpressContextFunctionArgument } from '@as-integrations/express5';
import { type JwtPayload, verifyJwt } from '../utils/jwt';

export type GraphqlContext = {
  userId: string | undefined;
  token: string | undefined;
  req: ExpressContextFunctionArgument['req'];
  res: ExpressContextFunctionArgument['res'];
};

export const buildContext = async ({
  req,
  res,
}: ExpressContextFunctionArgument): Promise<GraphqlContext> => {
  const authHeader = req.headers.authorization;
  let userId: string | undefined;
  let token: string | undefined;

  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.substring(7);
    try {
      const payload = verifyJwt(token) as JwtPayload;
      userId = payload?.id;
    } catch {}
  }

  return { userId, token, req, res };
};
