import Category from "../../types/Category";
import admin = require("firebase-admin");
import getAllCategories from "../query/getAllCategories";

const deleteCategory = async (id: string): Promise<Category[]> => {
  const db = admin.firestore();

  await db
    .collection("categories")
    .doc(id)
    .delete();

  return await getAllCategories();
};

export default deleteCategory;
