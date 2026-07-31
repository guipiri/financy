import {
  Field,
  GraphQLISODateTime,
  Int,
  ObjectType,
  registerEnumType,
} from 'type-graphql';
import { TransactionType } from '../../prisma/generated/enums';
import { Category } from './category.model';
import { User } from './user.model';

registerEnumType(TransactionType, {
  name: 'TransactionType',
  description: 'Tipo da transação (INCOME ou EXPENSE)',
});

@ObjectType()
export class Transaction {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  description!: string;

  @Field(() => Int)
  amountInCents!: number;

  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => String)
  categoryId!: string;

  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field(() => User)
  user!: User;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
