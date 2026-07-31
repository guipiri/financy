import { Arg, Mutation, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { SignInInput, SignUpInput } from '../dtos/input/auth.input';
import { SignInOutput, SignUpOutput } from '../dtos/output/auth.output';
import { AuthService } from '../services/auth.service';

@Service()
@Resolver()
export class AuthResolver {
  @Inject(() => AuthService)
  private readonly authService!: AuthService;

  @Mutation(() => SignUpOutput)
  signUp(
    @Arg('data', () => SignUpInput) data: SignUpInput,
  ): Promise<SignUpOutput> {
    return this.authService.signUp(data);
  }

  @Mutation(() => SignInOutput)
  signIn(
    @Arg('data', () => SignInInput) data: SignInInput,
  ): Promise<SignInOutput> {
    return this.authService.signIn(data);
  }
}
