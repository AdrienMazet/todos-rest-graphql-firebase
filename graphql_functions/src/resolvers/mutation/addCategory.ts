import Category from "../../types/Category";
import admin = require("firebase-admin");

const addCategory = async (name: string): Promise<Category> => {
  const db = admin.firestore();
  const data = { name, todos: [] };

  const categoryRef = await db.collection("categories").add(data);
  const category = await categoryRef.get();

  return {
    id: categoryRef.id,
    name: category.data()?.name,
    todos: category.data()?.todos
  };
};

export default addCategory;
