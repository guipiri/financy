import { Field, GraphQLISODateTime, ObjectType } from 'type-graphql';

@ObjectType()
export class Category {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  description!: string;

  @Field(() => String)
  color!: string;

  @Field(() => String)
  iconKey!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
