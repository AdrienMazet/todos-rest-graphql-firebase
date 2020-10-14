import {
  postCategory,
  getCategoryById,
  deleteCategory,
  addTodo,
  deleteTodo
} from "./requests";

describe("DeleteTodo", () => {
  it("Todo should be deleted properly", async () => {
    const name = "TestCategory";

    const postResponse = await postCategory(name);
    const id = postResponse.data[0].id;

    const todoText = "TestTodo";
    await addTodo(id, todoText);

    const response1 = await getCategoryById(id);

    expect(response1.data.id).toBe(id);
    expect(response1.data.todos.length).toBe(1);

    await deleteTodo(id, response1.data.todos[0]);

    const response2 = await getCategoryById(id);

    await deleteCategory(id);

    expect(response2.data.id).toBe(id);
    expect(response2.data.todos.length).toBe(0);
  }, 20000);
});
