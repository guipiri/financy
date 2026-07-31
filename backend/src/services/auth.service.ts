import { Service } from 'typedi';
import type { SignInInput, SignUpInput } from '../dtos/input/auth.input';
import type { SignInOutput } from '../dtos/output/auth.output';
import { prisma } from '../lib/prisma';
import type { User } from '../models/user.model';
import { comparePassword, hashPassword } from '../utils/hash';
import { signJwt } from '../utils/jwt';

@Service()
export class AuthService {
  async signUp(data: SignUpInput) {
    const emailAlreadyExists = await prisma.user.findFirst({
      where: { email: data.email },
    });

    if (emailAlreadyExists) throw new Error('Email já cadastrado');

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: await hashPassword(data.password),
      },
    });

    return this.gerenerateTokens(user);
  }

  async signIn(data: SignInInput) {
    const user = await prisma.user.findFirst({
      where: { email: data.email },
    });

    if (!user) throw new Error('Usuário não cadastrado');

    const isPasswordCorrect = await comparePassword(
      data.password,
      user.password,
    );

    if (!isPasswordCorrect) throw new Error('Dados inválidos');

    return this.gerenerateTokens(user);
  }

  gerenerateTokens(user: User): SignInOutput {
    const accessToken = signJwt({ id: user.id, email: user.email }, '1d');
    const refreshToken = signJwt({ id: user.id, email: user.email }, '1d');
    return { accessToken, refreshToken, user };
  }
}
