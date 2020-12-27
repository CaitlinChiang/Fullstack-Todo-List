import { Todo } from '../../../_types/todo'
import { Context } from '../../../_types/context'
import Task from '../../../models/todo'

export default async (_root: undefined, args: { text: string }, context: Context): Promise<Todo> => {
  const todo = new Task({
    text: args.text,
    completed: false
  })
  await todo.save()
  return todo
}
