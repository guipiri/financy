import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @MinLength(2, { message: 'O título deve ter pelo menos 2 caracteres' })
  title!: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  description!: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'A cor é obrigatória' })
  color!: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'O ícone é obrigatório' })
  iconKey!: string;
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'O título deve ter pelo menos 2 caracteres' })
  title?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  color?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  iconKey?: string;
}
