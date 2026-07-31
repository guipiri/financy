import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Inject, Service } from 'typedi';
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from '../dtos/input/transaction.input';
import { CurrentUser } from '../graphql/decorators';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { Transaction } from '../models/transaction.model';
import type { User } from '../models/user.model';
import { TransactionService } from '../services/transaction.service';

@Service()
@Resolver(() => Transaction)
@UseMiddleware(isAuthenticated)
export class TransactionResolver {
  @Inject(() => TransactionService)
  private readonly transactionService!: TransactionService;

  @Query(() => [Transaction])
  transactions(@CurrentUser() user: User): Promise<Transaction[]> {
    return this.transactionService.getTransactions(user.id);
  }

  @Query(() => Transaction)
  transaction(
    @Arg('id', () => String) id: string,
    @CurrentUser() user: User,
  ): Promise<Transaction> {
    return this.transactionService.getTransactionById(id, user.id);
  }

  @Mutation(() => Transaction)
  createTransaction(
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @CurrentUser() user: User,
  ): Promise<Transaction> {
    return this.transactionService.createTransaction(data, user.id);
  }

  @Mutation(() => Transaction)
  updateTransaction(
    @Arg('id', () => String) id: string,
    @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
    @CurrentUser() user: User,
  ): Promise<Transaction> {
    return this.transactionService.updateTransaction(id, data, user.id);
  }

  @Mutation(() => Boolean)
  deleteTransaction(
    @Arg('id', () => String) id: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.transactionService.deleteTransaction(id, user.id);
  }
}
