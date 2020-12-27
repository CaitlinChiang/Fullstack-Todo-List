import { Todo } from '../../../_types/todo'
import { Context } from '../../../_types/context'
import Task from '../../../models/todo'

export default async (_root: undefined, args: { id: string, completed: boolean }, context: Context): Promise<Todo> => {
  return await Task.findByIdAndUpdate(
    args.id,
    { completed: args.completed },
    { new: true }
  )
}
