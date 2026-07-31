import type { MiddlewareFn } from 'type-graphql';
import type { GraphqlContext } from '../graphql/context';

export const isAuthenticated: MiddlewareFn<GraphqlContext> = async (
  { context },
  next,
) => {
  if (!context.userId) throw new Error('Usuário não autenticado');
  return next();
};
