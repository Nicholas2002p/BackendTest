import "reflect-metadata";
import { Router } from "express";
import { createYoga, createSchema, useExtendContext } from "graphql-yoga";
import { typeDefs } from "./typeDefinitions";
import { PrismaClient } from "@prisma/client";
import {
  Query as HiQuery,
  findAllTodo,
  findAllImcompleteTodos,
  findAllCompletedTodos,
  GetTodoById,
  findAllTodoPages
} from "./query";
import { Mutation as MutationFromMutation } from "./mutation";
import {
  Mutation as MutationFromTodo,
  MutationCompletion,
  MutationTitle,
  DeleteMutation
} from "./todo";

const prisma = new PrismaClient();

const yogaPublicRouter = Router();
// gotta merge Mutations to have multiple
const Mutation = {
  ...MutationFromMutation,
  ...MutationFromTodo,
  ...MutationCompletion,
  ...MutationTitle,
  ...DeleteMutation
};
const Query = {
  ...HiQuery,
  ...findAllTodo,
  ...findAllImcompleteTodos,
  ...findAllCompletedTodos,
  ...GetTodoById,
  ...findAllTodoPages
};

const schema = createSchema({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
});

const yoga = createYoga({
  schema,
  graphiql: true,
  healthCheckEndpoint: "/health",
  landingPage: false,
  logging: true,
  plugins: [
    useExtendContext(async (ctx) => {
      return {
        ...ctx,
        prisma: prisma,
      };
    }),
  ],
});
yogaPublicRouter.use(yoga);

export { yogaPublicRouter, yoga as yogaPublic };
