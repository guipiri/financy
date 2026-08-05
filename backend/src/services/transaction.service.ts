import { Service } from 'typedi';
import type { Prisma } from '../../prisma/generated/client';
import type {
  CreateTransactionInput,
  TransactionFiltersInput,
  UpdateTransactionInput,
} from '../dtos/input/transaction.input';
import { prisma } from '../lib/prisma';
import type {
  Transaction,
  TransactionsOutput,
} from '../models/transaction.model';

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

  async getTransactionsWithFilters(
    userId: string,
    filters?: TransactionFiltersInput,
  ): Promise<TransactionsOutput> {
    const page = filters?.page ?? 1;
    const perPage = filters?.perPage ?? 10;
    const where: Prisma.TransactionWhereInput = {
      userId,
      ...(filters?.search?.trim() && {
        description: { contains: filters.search.trim() },
      }),
      ...(filters?.type && { type: filters.type }),
      ...(filters?.categoryId && { categoryId: filters.categoryId }),
      ...((filters?.dateFrom || filters?.dateTo) && {
        date: {
          ...(filters.dateFrom && { gte: filters.dateFrom }),
          ...(filters.dateTo && { lte: filters.dateTo }),
        },
      }),
    };

    const [items, total] = await prisma.$transaction([
      prisma.transaction.findMany({
        where,
        include: {
          user: true,
          category: true,
        },
        orderBy: { date: 'desc' },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.transaction.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      perPage,
    };
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
