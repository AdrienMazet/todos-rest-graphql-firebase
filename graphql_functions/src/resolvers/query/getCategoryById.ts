import Category from "../../types/Category";
import admin = require("firebase-admin");

const getCategoryById = async (categoryId: any): Promise<Category> => {
  const db = admin.firestore();

  const category = await db
    .collection("categories")
    .doc(categoryId)
    .get();

  return {
    id: category.id,
    name: category.data()?.name,
    todos: category.data()?.todos
  };
};

export default getCategoryById;
