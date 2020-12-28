import { Todo } from '../../../_types/todo'
import Task from '../../../models/todo'

export default async (_root: undefined, args: { id: string }): Promise<Todo> => {
  await Task.deleteOne({ _id: args.id })
  return {
    id: args.id,
    text: '',
    completed: false
  }
}
