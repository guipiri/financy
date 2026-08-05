import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Inject, Service } from 'typedi';
import type { GraphqlContext } from '../graphql/context';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Service()
@Resolver()
@UseMiddleware(isAuthenticated)
export class UserResolver {
  @Inject(() => UserService)
  private readonly userService!: UserService;

  @Query(() => User)
  async me(@Ctx() context: GraphqlContext): Promise<User> {
    if (!context.userId) {
      throw new Error('Usuário não autenticado');
    }

    const user = await this.userService.findUserById(context.userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }

  @Query(() => [User])
  fetchAll(): Promise<User[]> {
    return this.userService.fetchAll();
  }
}
