import { QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";

export const Query: IQuery<Context> = {
  hello: () => "world",
};

export const findAllTodo: IQuery<Context> = {
  allTodos: async (_, __, { prisma }) => {
    try {
      const allTodo = await prisma.todo.findMany({});

      return allTodo.map((todo) => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
      }));
    } catch (error) {
      console.error("Error fetching all todos:", error);
      throw new Error("Error fetching all todos");
    }
  },
};

export const findAllImcompleteTodos: IQuery<Context> = {
  allIncompleteTodos: async (_, __, { prisma }) => {
    try {
      const allTodo = await prisma.todo.findMany({
        where: {
          completed: false,
        },
      });

      return allTodo.map((todo) => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
      }));
    } catch (error) {
      console.error("Error fetching all todos:", error);
      throw new Error("Error fetching all todos");
    }
  },
};

export const findAllCompletedTodos: IQuery<Context> = {
  allCompletedTodos: async (_, __, { prisma }) => {
    try {
      const allTodo = await prisma.todo.findMany({
        where: {
          completed: true,
        },
      });

      return allTodo.map((todo) => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
      }));
    } catch (error) {
      console.error("Error fetching all todos:", error);
      throw new Error("Error fetching all todos");
    }
  },
};

export const GetTodoById: IQuery<Context> = {
  specificTodo: async (_, { input }, { prisma }) => {
    const { id } = input;
    try {
      const Todo = await prisma.todo.findUnique({
        where: {
          id: id,
        },
      });
      return Todo
        ? {
            id: Todo.id,
            title: Todo.title,
            completed: Todo.completed,
            createdAt: Todo.createdAt.toISOString(),
            updatedAt: Todo.updatedAt.toISOString(),
          }
        : null;
    } catch (error) {
      console.error("Error fetching all todos:", error);
      throw new Error("Error fetching all todos");
    }
  },
};
//extra
export const findAllTodoPages: IQuery<Context> = {
  allTodosPages: async (_, { limit = 10, start = 0 }, { prisma }) => {
    try {
      const allTodo = await prisma.todo.findMany({
        skip: start,
        take: limit,
      });

      return allTodo.map((todo) => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
      }));
    } catch (error) {
      console.error("Error fetching all todos:", error);
      throw new Error("Error fetching all todos");
    }
  },
};

export const findAllTodosCreatedAndByCompleted: IQuery<Context> = {
  allCompletedandCreatedTodos: async (_, { date, completed }, { prisma }) => {
    try {
      const dateObject = new Date(date);

      if (isNaN(dateObject.getTime())) {
        throw new Error("Invalid date format");
      }
      const allTodo = await prisma.todo.findMany({
        where: {
          completed: completed,
          createdAt: {
            lte: dateObject,
          },
        },
      });

      return allTodo.map((todo) => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
      }));
    } catch (error) {
      console.error("Error fetching all todos:", error);
      throw new Error("Error fetching all todos");
    }
  },
};

export const findAllTodosCompletedandSorted: IQuery<Context> = {
  allCompletedandSortByCreated: async (_, { completed }, { prisma }) => {
    try {
      const allTodo = await prisma.todo.findMany({
        where: {
          completed: completed,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return allTodo.map((todo) => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
      }));
    } catch (error) {
      console.error("Error fetching all todos:", error);
      throw new Error("Error fetching all todos");
    }
  },
};
