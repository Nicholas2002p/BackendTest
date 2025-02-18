import { type QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";

export const Query: IQuery<Context> = {
  hello: () => "world",
};

export const findAllTodo: IQuery<Context> = {
  allTodos: async (_, __, { prisma }) => {

    try { 
      const allTodo = await prisma.todo.findMany({});

      return allTodo.map(todo => ({
         id: todo.id,
        title: todo.title,
        completed: todo.completed,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
      }));
    } catch (error) {
      console.error('Error fetching all todos:', error);
      throw new Error('Error fetching all todos');
    }

   },
};


