// tslint:disable-next-line: no-implicit-dependencies
import axios from "axios";
import Todo from "../src/types/Todo";

export const getAllCategories = async () => {
  return axios.get(
    "https://taskmachineserver.firebaseapp.com/api/v1/categories/"
  );
};

export const getCategoryById = async (id: string) => {
  return axios.get(
    "https://taskmachineserver.firebaseapp.com/api/v1/categories/" + id
  );
};

export const postCategory = async (name: string) => {
  return axios.post(
    "https://taskmachineserver.firebaseapp.com/api/v1/categories/",
    {
      name
    }
  );
};

export const deleteCategory = async (id: string) => {
  return axios.delete(
    "https://taskmachineserver.firebaseapp.com/api/v1/categories/" + id
  );
};

export const addTodo = async (categoryId: string, text: string) => {
  return axios.post("https://taskmachineserver.firebaseapp.com/api/v1/todos/", {
    categoryId,
    text
  });
};

export const deleteTodo = async (categoryId: string, todo: Todo) => {
  return axios.put(
    "https://taskmachineserver.firebaseapp.com/api/v1/categories/" +
      categoryId +
      "/todos/",
    {
      todo
    }
  );
};

export const toggleTodoDone = async (categoryId: string, todoId: string) => {
  return axios.put(
    "https://taskmachineserver.firebaseapp.com/api/v1/categories/" +
      categoryId +
      "/todos/" +
      todoId
  );
};
