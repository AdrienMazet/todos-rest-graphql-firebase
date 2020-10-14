import Category from "../../types/Category";
import getCategoryById from "../query/getCategoryById";
import admin = require("firebase-admin");

const toggleTodo = async (
  categoryId: string,
  todoId: string
): Promise<Category> => {
  const db = admin.firestore();
  const category = await getCategoryById(categoryId);

  await db
    .collection("categories")
    .doc(categoryId)
    .update({
      todos: category.todos.map(todo =>
        todo.id === todoId ? { ...todo, done: !todo.done } : todo
      )
    });

  return await getCategoryById(categoryId);
};

export default toggleTodo;
