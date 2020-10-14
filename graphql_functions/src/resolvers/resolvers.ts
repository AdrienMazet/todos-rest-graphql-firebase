import Todo from "../types/Todo";
import Category from "../types/Category";
import getAllCategories from "./query/getAllCategories";
import getCategoryById from "./query/getCategoryById";
import addCategory from "./mutation/addCategory";
import deleteCategory from "./mutation/deleteCategory";
import addTodo from "./mutation/addTodo";
import toggleTodo from "./mutation/toggleTodo";
import deleteTodo from "./mutation/deleteTodo";
import { PubSub } from "apollo-server-express";

const pubsub = new PubSub();

const CATEGORY_ADDED = "CATEGORY_ADDED";
const CATEGORY_DELETED = "CATEGORY_DELETED";
const TODO_ADDED = "TODO_ADDED";
const TODO_TOGGLED = "TODO_TOGGLED";
const TODO_DELETED = "TODO_DELETED";

// handle errors
// https://www.apollographql.com/docs/apollo-server/schema/schema/#designing-mutations
// https://www.apollographql.com/docs/apollo-server/schema/schema/#structuring-mutation-responses
const resolvers = {
  Todo: {
    id: (todo: Todo) => todo.id,
    text: (todo: Todo) => todo.text,
    done: (todo: Todo) => todo.done
  },
  Category: {
    id: (category: Category) => category.id,
    name: (category: Category) => category.name,
    todos: (category: Category) => category.todos
  },
  Query: {
    getCategories: async () => await getAllCategories(),
    getCategory: async (parent: any, { id }: { id: string }) =>
      await getCategoryById(id)
  },
  Mutation: {
    addCategory: async (_: any, { name }: { name: string }) => {
      const category = await addCategory(name);
      pubsub.publish(CATEGORY_ADDED, { categoryAdded: category });
      return category;
    },
    deleteCategory: async (_: any, { id }: { id: string }) => {
      const categories = await deleteCategory(id);
      pubsub.publish(CATEGORY_DELETED, { categoryDeleted: categories });
      return categories;
    },
    addTodo: async (
      _: any,
      { categoryId, text }: { categoryId: string; text: string }
    ) => {
      const category = await addTodo(categoryId, text);
      pubsub.publish(TODO_ADDED, { todoAdded: category });
      return category;
    },
    toggleTodo: async (
      _: any,
      { categoryId, todoId }: { categoryId: string; todoId: string }
    ) => {
      const category = await toggleTodo(categoryId, todoId);
      pubsub.publish(TODO_TOGGLED, { todoToggled: category });
      return category;
    },
    deleteTodo: async (
      _: any,
      { categoryId, todo }: { categoryId: string; todo: Todo }
    ) => {
      const category = await deleteTodo(categoryId, todo);
      pubsub.publish(TODO_DELETED, { todoDeleted: category });
      return category;
    }
  },
  Subscription: {
    categoryAdded: {
      subscribe: () => pubsub.asyncIterator([CATEGORY_ADDED])
    },
    categoryDeleted: {
      subscribe: () => pubsub.asyncIterator([CATEGORY_DELETED])
    },
    todoAdded: {
      subscribe: () => pubsub.asyncIterator([TODO_ADDED])
    },
    todoToggled: {
      subscribe: () => pubsub.asyncIterator([TODO_TOGGLED])
    },
    todoDeleted: {
      subscribe: () => pubsub.asyncIterator([TODO_DELETED])
    }
  }
};

export default resolvers;
