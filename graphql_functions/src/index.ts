import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import resolvers from "./resolvers/resolvers";

admin.initializeApp();

const app = express();

const typeDefs = gql`
  type Todo {
    id: ID!
    text: String!
    done: Boolean!
  }

  input TodoInput {
    id: ID!
    text: String!
    done: Boolean!
  }

  type Category {
    id: ID!
    name: String!
    todos: [Todo!]!
  }

  type Query {
    getCategories: [Category!]!
    getCategory(id: ID!): Category
  }

  type Mutation {
    addCategory(name: String!): Category!
    deleteCategory(id: ID!): [Category!]!
    addTodo(categoryId: ID!, text: String!): Category!
    toggleTodo(categoryId: ID!, todoId: ID!): Category!
    deleteTodo(categoryId: ID!, todo: TodoInput!): Category!
  }

  type Subscription {
    categoryAdded: Category!
    categoryDeleted: [Category!]!
    todoAdded: Category!
    todoToggled: Category!
    todoDeleted: Category!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true
});

server.applyMiddleware({
  app,
  path: "/",
  cors: {
    origin: "http://localhost:3000"
  }
});

exports.graphql = functions.https.onRequest(app);
