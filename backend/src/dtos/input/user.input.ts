import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name!: string;
}
