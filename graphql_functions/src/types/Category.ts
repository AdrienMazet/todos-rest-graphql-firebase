import Todo from "./Todo";

type Category = {
  id: string;
  name: string;
  todos: Todo[];
};

export default Category;
