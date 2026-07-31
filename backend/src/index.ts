import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { buildContext } from './graphql/context';
import { AuthResolver } from './resolvers/auth.resolver';
import { CategoryResolver } from './resolvers/category.resolver';
import { TransactionResolver } from './resolvers/transaction.resolver';
import { UserResolver } from './resolvers/user.resolver';

const schema = await buildSchema({
  resolvers: [
    AuthResolver,
    UserResolver,
    TransactionResolver,
    CategoryResolver,
  ],
  container: Container,
  validate: true,
  emitSchemaFile: './schema.graphql',
});

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

const server = new ApolloServer({ schema });
await server.start();

app.all('/graphql', expressMiddleware(server, { context: buildContext }));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
