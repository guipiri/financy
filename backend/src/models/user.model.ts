import { Field, GraphQLISODateTime, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
