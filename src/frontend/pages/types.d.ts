export type Todo = {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoItemProps {
  todo: Todo;
}

export interface TodoListProps {
  todos: Array<Todo>;
}
