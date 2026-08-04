import { Field, GraphQLISODateTime, ObjectType } from 'type-graphql';

@ObjectType()
class Items {
  @Field(() => Number)
  qty!: number;

  @Field(() => Number)
  amountIncents!: number;
}

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

  @Field(() => Items, { nullable: true })
  items?: Items;

  @Field(() => String)
  userId!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
