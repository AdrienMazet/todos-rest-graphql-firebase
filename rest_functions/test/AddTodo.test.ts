import {
  postCategory,
  getCategoryById,
  deleteCategory,
  addTodo
} from "./requests";

describe("AddTodo", () => {
  it("Todo should be added properly", async () => {
    const name1 = "TestCategory";
    const name2 = "UntouchedCategory";
    const name3 = "NewUntouchedCategory";

    const postResponse1 = await postCategory(name1);
    const id1 = postResponse1.data[0].id;

    const postResponse2 = await postCategory(name2);
    const id2 = postResponse2.data[1].id;

    const todoText = "TestTodo";
    await addTodo(id1, todoText);

    const response1 = await getCategoryById(id1);
    const response2 = await getCategoryById(id2);

    await deleteCategory(id1);
    await deleteCategory(id2);

    expect(response1.data.id).toBe(id1);
    expect(response1.data.todos.length).toBe(1);
    expect(response1.data.todos[0].text).toBe(todoText);
    expect(response1.data.todos[0].done).toBeFalsy();

    expect(response2.data.id).toBe(id2);
    expect(response2.data.todos.length).toBe(0);

    const postResponse3 = await postCategory(name3);
    await deleteCategory(postResponse3.data[0].id);
    expect(postResponse3.data[0].todos.length).toBe(0);
  }, 20000);
});
