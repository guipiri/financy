import { Query, Resolver, UseMiddleware } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Service()
@Resolver()
@UseMiddleware(isAuthenticated)
export class UserResolver {
  @Inject(() => UserService)
  private readonly userService!: UserService;

  @Query(() => [User])
  fetchAll(): Promise<User[]> {
    return this.userService.fetchAll();
  }
}
