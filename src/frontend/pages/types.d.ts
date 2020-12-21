export type Todo = {
  id: number;
  text: string;
  completed: boolean;
}

export interface AddTodoProps {
  addTodo: (newItem: string) => void
}

export interface TodoItemProps {
  todo: Todo;
  toggleState: (selectedTodo: Todo) => void
  deleteTodo: (selectedTodo: Todo) => void;
}

export interface TodoListProps {
  todos: Array<Todo>;
  toggleState: (selectedTodo: Todo) => void;
  deleteTodo: (selectedTodo: Todo) => void;
}
