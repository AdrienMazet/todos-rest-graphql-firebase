import Category from "../../types/Category";
import admin = require("firebase-admin");

const getAllCategories = async (): Promise<Category[]> => {
  const db = admin.firestore();

  const categoryQuerySnapshot = await db.collection("categories").get();
  const categories: Category[] = [];

  categoryQuerySnapshot.forEach(doc => {
    categories.push({
      id: doc.id,
      name: doc.data()?.name,
      todos: doc.data()?.todos
    });
  });
  return categories;
};

export default getAllCategories;
