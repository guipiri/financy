import { Service } from 'typedi';
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../dtos/input/category.input';
import { prisma } from '../lib/prisma';
import type { Category } from '../models/category.model';

@Service()
export class CategoryService {
  async getCategories(userId: string): Promise<Category[]> {
    return prisma.transactionCategory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCategoryById(id: string, userId: string): Promise<Category> {
    const category = await prisma.transactionCategory.findFirst({
      where: { id, userId },
    });

    if (!category) throw new Error('Categoria não encontrada.');

    return category;
  }

  async createCategory(
    data: CreateCategoryInput,
    userId: string,
  ): Promise<Category> {
    return prisma.transactionCategory.create({
      data: {
        title: data.title,
        description: data.description,
        color: data.color,
        iconKey: data.iconKey,
        userId,
      },
    });
  }

  async updateCategory(
    id: string,
    data: UpdateCategoryInput,
    userId: string,
  ): Promise<Category> {
    const category = await prisma.transactionCategory.findFirst({
      where: { id, userId },
    });

    if (!category) throw new Error('Categoria não encontrada.');

    return prisma.transactionCategory.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
        ...(data.color !== undefined && { color: data.color }),
        ...(data.iconKey !== undefined && { iconKey: data.iconKey }),
      },
    });
  }

  async deleteCategory(id: string, userId: string): Promise<boolean> {
    const category = await prisma.transactionCategory.findFirst({
      where: { id, userId },
    });

    if (!category) throw new Error('Categoria não encontrada.');

    await prisma.transactionCategory.delete({
      where: { id },
    });

    return true;
  }
}
