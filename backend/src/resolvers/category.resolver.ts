import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Inject, Service } from 'typedi';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../dtos/input/category.input';
import { CurrentUser } from '../graphql/decorators';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { Category } from '../models/category.model';
import type { User } from '../models/user.model';
import { CategoryService } from '../services/category.service';

@Service()
@Resolver(() => Category)
@UseMiddleware(isAuthenticated)
export class CategoryResolver {
  @Inject(() => CategoryService)
  private readonly categoryService!: CategoryService;

  @Query(() => [Category])
  categories(@CurrentUser() user: User): Promise<Category[]> {
    return this.categoryService.getCategories(user.id);
  }

  @Query(() => Category)
  category(
    @Arg('id', () => String) id: string,
    @CurrentUser() user: User,
  ): Promise<Category> {
    return this.categoryService.getCategoryById(id, user.id);
  }

  @Mutation(() => Category)
  createCategory(
    @Arg('data', () => CreateCategoryInput) data: CreateCategoryInput,
    @CurrentUser() user: User,
  ): Promise<Category> {
    console.log(user);
    return this.categoryService.createCategory(data, user.id);
  }

  @Mutation(() => Category)
  updateCategory(
    @Arg('id', () => String) id: string,
    @Arg('data', () => UpdateCategoryInput) data: UpdateCategoryInput,
    @CurrentUser() user: User,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, data, user.id);
  }

  @Mutation(() => Boolean)
  deleteCategory(
    @Arg('id', () => String) id: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.categoryService.deleteCategory(id, user.id);
  }
}
