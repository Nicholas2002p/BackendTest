import { expect } from "chai";
import sinon from "sinon";
import { describe, it, beforeEach, afterEach } from "mocha";
import { Context } from "../src/graphql/context";
import { PrismaClient, Todo } from "@prisma/client";
import {
  Mutation as MutationFromTodo,
  MutationCompletion,
  MutationTitle,
  DeleteMutation,
} from "../src/graphql/todo";

describe("Create Todo", () => {
  let prismaMock: PrismaClient;
  let context: Context;
  let createStub: sinon.SinonStub;

  beforeEach(() => {
    prismaMock = new PrismaClient();
    createStub = sinon.stub(prismaMock.todo, "create");
    context = { prisma: prismaMock };
  });

  afterEach(() => {
    sinon.restore();
  });
  var date = new Date();
  it("should create a new todo", async () => {
    const mockTodo: Todo = {
      id: "1",
      title: "Test Todo",
      completed: false,
      createdAt: date,
      updatedAt: date,
    };
    // Stub the prisma.todo.create method to return mockTodo
    createStub.resolves(mockTodo);

    const createTodoFunction = MutationFromTodo.createTodo as Function;

    const result = await createTodoFunction(
      null,
      { input: { title: "Test Todo", completed: false } },
      context
    );

    expect(result).to.deep.equal({
      id: 1,
      title: "Test Todo",
      completed: false,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    });
  });
});
