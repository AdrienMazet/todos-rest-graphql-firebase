import Category from "../../types/Category";
import admin = require("firebase-admin");
import Todo from "../../types/Todo";
import getCategoryById from "../query/getCategoryById";

const addTodo = async (categoryId: string, text: string): Promise<Category> => {
  const db = admin.firestore();
  const ref = db.collection("categories").doc();

  const todo: Todo = {
    text,
    id: ref.id,
    done: false
  };

  await db
    .collection("categories")
    .doc(categoryId)
    .update({
      todos: admin.firestore.FieldValue.arrayUnion(todo)
    });

  return await getCategoryById(categoryId);
};

export default addTodo;
