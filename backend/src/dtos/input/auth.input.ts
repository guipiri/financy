import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class SignUpInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name!: string;

  @Field(() => String)
  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email!: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password!: string;
}

@InputType()
export class SignInInput {
  @Field(() => String)
  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email!: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  password!: string;
}
