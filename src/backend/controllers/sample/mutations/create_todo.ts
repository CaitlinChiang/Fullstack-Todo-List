import { Todo } from '../../../_types/todo'
import { Context } from '../../../_types/context'
const Task = require('../../../models/todo')

export default async (_root: undefined, args: { text: string }, context: Context): Promise<Todo> => {
  const todo = new Task({
    text: args.text,
    completed: false
  })
  await todo.save()
  return todo
}
