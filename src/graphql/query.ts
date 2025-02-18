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


export const findAllImcompleteTodos: IQuery<Context> = {
  allIncompleteTodos: async (_, __, { prisma }) => {

    try { 
      const allTodo = await prisma.todo.findMany({
        where: {
          completed : false
        }
      });

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

export const findAllCompletedTodos: IQuery<Context> = {
  allCompletedTodos: async (_, __, { prisma }) => {

    try { 
      const allTodo = await prisma.todo.findMany({
        where: {
          completed : true
        }
      });

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
