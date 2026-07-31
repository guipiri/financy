import { Service } from 'typedi';
import { prisma } from '../lib/prisma';
import type { User } from '../models/user.model';

@Service()
export class UserService {
  async fetchAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }
}
