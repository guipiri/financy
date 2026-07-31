import { createParameterDecorator, type ResolverData } from 'type-graphql';
import { Container } from 'typedi';
import type { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import type { GraphqlContext } from './context';

export const CurrentUser = () => {
  return createParameterDecorator(
    async ({ context }: ResolverData<GraphqlContext>): Promise<User | null> => {
      if (!context.userId) return null;

      const userService = Container.get(UserService);
      return await userService.findUserById(context.userId);
    },
  );
};
