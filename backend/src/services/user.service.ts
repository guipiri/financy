import { Service } from 'typedi';
import type { UpdateUserInput } from '../dtos/input/user.input';
import { prisma } from '../lib/prisma';
import type { User } from '../models/user.model';

@Service()
export class UserService {
  async fetchAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) return null;

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.findUserById(id);

    if (!user) throw new Error('Usuário não encontrado.');

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name: data.name },
    });

    const { password, ...updatedUserWithoutPassword } = updatedUser;

    return updatedUserWithoutPassword;
  }
}
