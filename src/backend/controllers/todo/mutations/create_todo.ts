import { Todo } from '../../../_types/todo'
import Task from '../../../models/todo'

export default async (_root: undefined, args: { text: string }): Promise<Todo> => {
  const todo = new Task({
    text: args.text,
    completed: false
  })
  await todo.save()
  return todo
}
