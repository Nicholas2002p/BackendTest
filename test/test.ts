import { expect } from "chai";
import sinon from "sinon";
import { describe, it, beforeEach, afterEach } from "mocha";
import { Context } from "../src/graphql/context";
import { PrismaClient } from "@prisma/client";
import {
  Mutation as MutationFromTodo,
  MutationCompletion,
  MutationTitle,
  DeleteMutation
} from "../src/graphql/todo";

describe("Create Todo", () => {
    let prismaMock: sinon.SinonStubbedInstance<PrismaClient>;
    let context: Context;


    beforeEach(() => {
    prismaMock = sinon.createStubInstance(PrismaClient);
    context = { prisma: prismaMock } as Context;
  });

    afterEach(() => {
    sinon.restore(); 
  });
});