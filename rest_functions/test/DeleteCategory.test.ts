// tslint:disable-next-line: no-implicit-dependencies
import { postCategory, deleteCategory } from "../test/requests";

describe("DeleteCategory", () => {
  it("Should delete the category properly", async () => {
    const name = "TestCategory";
    let response = await postCategory(name);

    expect(response.status).toBe(200);
    expect(response.data[0].name).toBe(name);
    expect(response.data[0].todos.length).toBe(0);

    response = await deleteCategory(response.data[0].id);

    expect(response.data.length).toBe(0);
  });
});
