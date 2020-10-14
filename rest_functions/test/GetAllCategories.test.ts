import { getAllCategories, deleteCategory, postCategory } from "./requests";

describe("GetAllCategoriesTest", () => {
  it("Should return empty array", async () => {
    const response = await getAllCategories();
    expect(response.status).toBe(200);
    expect(response.data.length).toBe(0);
  });
  it("Should return array with one elements", async () => {
    const name = "TestCategory";
    await postCategory(name);
    const response = await getAllCategories();
    await deleteCategory(response.data[0].id);

    expect(response.status).toBe(200);
    expect(response.data.length).toBe(1);
    expect(response.data[0].name).toBe(name);
    expect(response.data[0].todos.length).toBe(0);
  });
  it("Should return empty array", async () => {
    const response = await getAllCategories();
    expect(response.status).toBe(200);
    expect(response.data.length).toBe(0);
  });
});
