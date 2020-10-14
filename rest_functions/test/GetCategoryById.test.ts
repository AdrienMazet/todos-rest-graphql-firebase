// tslint:disable-next-line: no-implicit-dependencies
import { getCategoryById, postCategory, deleteCategory } from "./requests";

describe("GetCategoryById", () => {
  it("Should throw error", async () => {
    await expect(getCategoryById("12345")).rejects.toThrow();
  });
  it("Should return proper category", async () => {
    const name = "TestCategory";
    const postResponse = await postCategory(name);
    const id = postResponse.data[0].id;
    const response = await getCategoryById(id);
    await deleteCategory(response.data.id);

    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(response.data.id).toBe(id);
    expect(response.data.name).toBe(name);
    expect(response.data.todos.length).toBe(0);
  });
});
