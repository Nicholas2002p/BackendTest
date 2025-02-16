import { Context } from './context';
import { MutationResolvers } from './generated/graphql';

export const Mutation: MutationResolvers<Context> = {
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

