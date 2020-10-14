// tslint:disable-next-line: no-implicit-dependencies
import { postCategory, deleteCategory } from "./requests";

describe("AddCategory", () => {
  it("Category should be added properly", async () => {
    const name = "TestCategory";
    const response = await postCategory(name);
    await deleteCategory(response.data[0].id);

    expect(response.status).toBe(200);
    expect(response.data[0].name).toBe(name);
    expect(response.data[0].todos.length).toBe(0);
  });
});
