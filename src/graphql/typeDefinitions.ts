export const typeDefs = /* GraphQL */ `
  input CreateSomethingInput {
    name: String!
  }

  input CreateTodoInput {
    title: String!
    completed: Boolean
  }

  input UpdateTodoInputCompleted {
    id: ID!
    completed: Boolean!
  }

  input UpdateTodoInputTitle {
    id: ID!
    title: String!
  }

  type Something {
    id: ID!
    name: String!
  }

  input IdTodo {
    id: ID!
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Mutation {
    createSomething(input: CreateSomethingInput!): Something!
    createTodo(input: CreateTodoInput!): Todo!
    updateTodoCompletion(input: UpdateTodoInputCompleted!): Todo!
    updateTodoTitle(input: UpdateTodoInputTitle!): Todo!
    DeleteTodo(input: IdTodo!): String
  }

  type Query {
    hello: String
    allTodos: [Todo!]
    allTodosPages(limit: Int!, start: Int!): [Todo!]
    allIncompleteTodos: [Todo!]
    allCompletedTodos: [Todo!]
    specificTodo(input: IdTodo!): Todo
    allCompletedandCreatedTodos(date: String!, completed: Boolean!): [Todo!]
    allCompletedandSortByCreated(completed: Boolean!): [Todo!]
  }
`;
