import { Todo } from '../../../_types/todo'
import { Context } from '../../../_types/context'
const Task = require('../../../models/todo')

export default async (_root: undefined, args: { id: string }, context: Context): Promise<Todo> => {
  await Task.deleteOne({_id: args.id})
  return null
}
