import { Todo } from '../../../_types/todo'
import Task from '../../../models/todo'

export default async (_root: undefined, args: { id: string }): Promise<Todo> => {
  return await Task.findOne(
    { _id: args.id }
  )
}
