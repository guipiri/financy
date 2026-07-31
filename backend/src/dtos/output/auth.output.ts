import { Field, ObjectType } from 'type-graphql';
import { User } from '../../models/user.model';

@ObjectType()
export class SignUpOutput {
  @Field(() => String)
  accessToken!: string;

  @Field(() => String, { nullable: true })
  refreshToken?: string | null;

  @Field(() => User)
  user!: User;
}

@ObjectType()
export class SignInOutput {
  @Field(() => String)
  accessToken!: string;

  @Field(() => String, { nullable: true })
  refreshToken?: string | null;

  @Field(() => User)
  user!: User;
}
