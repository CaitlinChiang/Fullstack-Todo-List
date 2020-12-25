import { Todo } from '../../../_types/todo'
import { Context } from '../../../_types/context'
const Task = require('../../../models/todo')

export default async (_root: undefined, args: { id: string, completed: boolean }, context: Context): Promise<Todo> => {
  return await Task.findOneAndUpdate(
    {_id: args.id}, 
    {completed: args.completed}
  )
}
