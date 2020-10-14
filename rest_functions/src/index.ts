import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";
import Category from "./types/Category";
import Todo from "./types/Todo";

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const app = express();
const main = express();

main.use("/api/v1", app);
main.use(bodyParser.json());

export const webApi = functions.https.onRequest(main);

const getAllCategories = async (): Promise<Category[]> => {
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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE");
  next();
});

// Categories

/**
 * Add a category
 * @param : name (from body)
 */
app.post("/categories", async (request, response) => {
  try {
    const { name } = request.body;

    if (!name) throw new Error("Name is required to create a category");

    const data = { name, todos: [] };
    await db.collection("categories").add(data);

    response.json(await getAllCategories());
  } catch (error) {
    response.status(500).send(error);
  }
});

/**
 * Delete a category
 * @param : id (provided by the url)
 */
app.delete("/categories/:id", async (request, response) => {
  try {
    const categoryId = request.params.id;

    if (!categoryId) throw new Error("id is blank");

    await db
      .collection("categories")
      .doc(categoryId)
      .delete();

    response.json(await getAllCategories());
  } catch (error) {
    response.status(500).send(error);
  }
});

/**
 * Get all the categories
 */
app.get("/categories", async (request, response) => {
  try {
    response.json(await getAllCategories());
  } catch (error) {
    response.status(500).send(error);
  }
});

/**
 * Get a specific category
 * @param : id (provided by the url)
 */
app.get("/categories/:id", async (request, response) => {
  try {
    const categoryId = request.params.id;

    if (!categoryId) throw new Error("Category ID is required");

    const category = await db
      .collection("categories")
      .doc(categoryId)
      .get();

    if (!category.exists) {
      throw new Error("Category doesnt exist.");
    }

    response.json({
      id: category.id,
      name: category.data()?.name,
      todos: category.data()?.todos
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

// Todos

/**
 * Add a todo to a category
 * @param : categoryId (provided by the body)
 * @param : text (provided by the body)
 */
app.post("/todos", async (request, response) => {
  try {
    const categoryId = request.body.categoryId;
    const text: string = request.body.text;

    if (!categoryId) throw new Error("Category ID is required");

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

    response.json(await getAllCategories());
  } catch (error) {
    response.status(500).send(error);
  }
});

/**
 * Delete a todo in a category
 * @param : categoryId (provided by the url)
 * @param : todo (provided in the body)
 */
app.put("/categories/:categoryId/todos/", async (request, response) => {
  try {
    const categoryId = request.params.categoryId;
    const todo: Todo = request.body.todo;

    if (!categoryId) throw new Error("Category ID is required");
    if (!todo) throw new Error("Todo is required");

    await db
      .collection("categories")
      .doc(categoryId)
      .update({
        todos: admin.firestore.FieldValue.arrayRemove(todo)
      });

    response.json(await getAllCategories());
  } catch (error) {
    response.status(500).send(error);
  }
});

/**
 * Toggle the done value of a todo in a category
 * @param : categoryId (provided by the url)
 * @param : todoId (provided by the url)
 */
app.put("/categories/:categoryId/todos/:todoId", async (request, response) => {
  try {
    const categoryId = request.params.categoryId;
    const todoId = request.params.todoId;

    if (!categoryId) throw new Error("Category ID is required");
    if (!todoId) throw new Error("Todo ID is required");

    const category = await db
      .collection("categories")
      .doc(categoryId)
      .get();

    if (!category.exists) {
      throw new Error("Category doesnt exist.");
    }

    await db
      .collection("categories")
      .doc(categoryId)
      .update({
        todos: category
          .data()
          ?.todos.map((todo: Todo) =>
            todo.id === todoId ? { ...todo, done: !todo.done } : todo
          )
      });

    response.json(await getAllCategories());
  } catch (error) {
    response.status(500).send(error);
  }
});
