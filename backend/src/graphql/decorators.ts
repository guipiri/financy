import { createParameterDecorator, type ResolverData } from 'type-graphql';
import { Container } from 'typedi';
import type { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import type { GraphqlContext } from './context';

export const CurrentUser = () => {
  return createParameterDecorator(
    async ({ context }: ResolverData<GraphqlContext>): Promise<User> => {
      if (!context.userId) throw new Error('Usuário não autenticado');
      const userService = Container.get(UserService);
      const user = await userService.findUserById(context.userId);
      if (!user) throw new Error('Usuário não encontrado');
      return user;
    },
  );
};
