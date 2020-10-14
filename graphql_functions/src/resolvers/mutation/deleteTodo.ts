import Category from "../../types/Category";
import admin = require("firebase-admin");
import Todo from "../../types/Todo";
import getCategoryById from "../query/getCategoryById";

const deleteTodo = async (
  categoryId: string,
  todo: Todo
): Promise<Category> => {
  const db = admin.firestore();

  await db
    .collection("categories")
    .doc(categoryId)
    .update({
      todos: admin.firestore.FieldValue.arrayRemove(todo)
    });

  return await getCategoryById(categoryId);
};

export default deleteTodo;
