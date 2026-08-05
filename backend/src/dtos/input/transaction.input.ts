import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from 'class-validator';
import { Field, GraphQLISODateTime, InputType, Int } from 'type-graphql';
import { TransactionType } from '../../../prisma/generated/enums';

@InputType()
export class TransactionFiltersInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field(() => TransactionType, { nullable: true })
  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUUID('4', { message: 'ID de categoria inválido' })
  categoryId?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  @IsDate()
  dateFrom?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  @IsDate()
  dateTo?: Date;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  perPage?: number;
}

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @MinLength(3, { message: 'A descrição deve ter pelo menos 3 caracteres' })
  description!: string;

  @Field(() => Int)
  @IsInt()
  @IsPositive({ message: 'O valor deve ser maior que zero' })
  amountInCents!: number;

  @Field(() => TransactionType)
  @IsEnum(TransactionType)
  type!: TransactionType;

  @Field(() => GraphQLISODateTime)
  @IsDate()
  date!: Date;

  @Field(() => String)
  @IsUUID('4', { message: 'ID de categoria inválido' })
  @IsNotEmpty({ message: 'A categoria é obrigatória' })
  categoryId!: string;
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'A descrição deve ter pelo menos 3 caracteres' })
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @IsPositive({ message: 'O valor deve ser maior que zero' })
  amountInCents?: number;

  @Field(() => TransactionType, { nullable: true })
  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  @IsDate()
  date?: Date;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUUID('4', { message: 'ID de categoria inválido' })
  categoryId?: string;
}
