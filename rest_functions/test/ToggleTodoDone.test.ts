import {
  postCategory,
  getCategoryById,
  deleteCategory,
  addTodo,
  toggleTodoDone
} from "./requests";

describe("ToggleTodoDone", () => {
  it("Todo done field should be toggled properly", async () => {
    const name = "TestCategory";

    const postResponse = await postCategory(name);
    const id = postResponse.data[0].id;

    const todoText = "TestTodo";
    await addTodo(id, todoText);

    const response1 = await getCategoryById(id);

    expect(response1.data.id).toBe(id);
    expect(response1.data.todos[0].done).toBeFalsy();

    await toggleTodoDone(id, response1.data.todos[0].id);

    const response2 = await getCategoryById(id);

    expect(response2.data.todos[0].id).toBe(response1.data.todos[0].id);
    expect(response2.data.todos[0].done).toBeTruthy();

    await toggleTodoDone(id, response1.data.todos[0].id);

    const response3 = await getCategoryById(id);

    await deleteCategory(id);

    expect(response3.data.todos[0].id).toBe(response1.data.todos[0].id);
    expect(response3.data.todos[0].done).toBeFalsy();
  }, 20000);
});
