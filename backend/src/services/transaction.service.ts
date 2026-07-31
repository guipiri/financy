import { Service } from 'typedi';
import type {
  CreateTransactionInput,
  UpdateTransactionInput,
} from '../dtos/input/transaction.input';
import { prisma } from '../lib/prisma';
import type { Transaction } from '../models/transaction.model';

@Service()
export class TransactionService {
  async getTransactions(userId: string): Promise<Transaction[]> {
    return prisma.transaction.findMany({
      where: { userId },
      include: {
        user: true,
        category: true,
      },
      orderBy: { date: 'desc' },
    });
  }

  async getTransactionById(id: string, userId: string): Promise<Transaction> {
    const transaction = await prisma.transaction.findFirst({
      where: { id, userId },
      include: {
        user: true,
        category: true,
      },
    });

    if (!transaction) throw new Error('Transação não encontrada.');

    return transaction;
  }

  async createTransaction(
    data: CreateTransactionInput,
    userId: string,
  ): Promise<Transaction> {
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) throw new Error('Usuário não encontrado.');

    const category = await prisma.transactionCategory.findFirst({
      where: { id: data.categoryId, userId },
    });

    if (!category) throw new Error('Categoria não encontrada.');

    return prisma.transaction.create({
      data: {
        description: data.description,
        amountInCents: data.amountInCents,
        type: data.type,
        date: data.date,
        categoryId: data.categoryId,
        userId,
      },
      include: {
        user: true,
        category: true,
      },
    });
  }

  async updateTransaction(
    id: string,
    data: UpdateTransactionInput,
    userId: string,
  ): Promise<Transaction> {
    const transaction = await prisma.transaction.findFirst({
      where: { id, userId },
    });

    if (!transaction) throw new Error('Transação não encontrada.');

    if (data.categoryId) {
      const category = await prisma.transactionCategory.findFirst({
        where: { id: data.categoryId, userId },
      });

      if (!category) throw new Error('Categoria não encontrada.');
    }

    return prisma.transaction.update({
      where: { id },
      data: {
        ...(data.description !== undefined && {
          description: data.description,
        }),
        ...(data.amountInCents !== undefined && {
          amountInCents: data.amountInCents,
        }),
        ...(data.type !== undefined && { type: data.type }),
        ...(data.date !== undefined && { date: data.date }),
        ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
      },
      include: {
        user: true,
        category: true,
      },
    });
  }

  async deleteTransaction(id: string, userId: string): Promise<boolean> {
    const transaction = await prisma.transaction.findFirst({
      where: { id, userId },
    });

    if (!transaction) throw new Error('Transação não encontrada.');

    await prisma.transaction.delete({
      where: { id },
    });

    return true;
  }
}
