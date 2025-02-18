import { Context } from './context';
import { MutationResolvers } from './generated/graphql';

export const Mutation: MutationResolvers<Context> = {
  //insert a new Todo
  createTodo: async (_, { input }, { prisma }) => {
    const { title, completed } = input;
    const currentTime = new Date();

    try {
      const newTodo = await prisma.todo.create({
        data: {
          title,
          completed: completed ?? false,
          createdAt: currentTime,
          updatedAt: currentTime,
        },
      });

      return {
        id: newTodo.id,
        title: newTodo.title,
        completed: newTodo.completed,
        createdAt: newTodo.createdAt.toISOString(),
        updatedAt: newTodo.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error('Error creating todo:', error);
      throw new Error('Error creating Todo');
    }
  },
};

export const MutationCompletion: MutationResolvers<Context> = {
  //update Completed field
    updateTodoCompletion: async (_, { input }, { prisma }) => {
    const { id, completed } = input; 

    try {
      const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { completed, updatedAt: new Date() },
      });

      return {
        id: updatedTodo.id,
        title: updatedTodo.title,
        completed: updatedTodo.completed,
        createdAt: updatedTodo.createdAt.toISOString(),
        updatedAt: updatedTodo.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error('Error updating todo Completed field:', error);
      throw new Error('Error updating Todo Completed field');
    }
  },
};

export const MutationTitle: MutationResolvers<Context> = {
    //update Title field
    updateTodoTitle: async (_, { input }, { prisma }) => {
    const { id, title } = input; 

    try {
      const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { title, updatedAt: new Date() },
      });

      return {
        id: updatedTodo.id,
        title: updatedTodo.title,
        completed: updatedTodo.completed,
        createdAt: updatedTodo.createdAt.toISOString(),
        updatedAt: updatedTodo.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error('Error updating todo Title field:', error);
      throw new Error('Error updating Todo Title field');
    }
  },
};