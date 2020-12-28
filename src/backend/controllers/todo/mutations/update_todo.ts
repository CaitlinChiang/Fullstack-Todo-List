import { Todo } from '../../../_types/todo'
import Task from '../../../models/todo'

export default async (_root: undefined, args: { id: string, completed: boolean }): Promise<Todo> => {
  return await Task.findByIdAndUpdate(
    args.id,
    { completed: args.completed },
    { new: true }
  )
}
