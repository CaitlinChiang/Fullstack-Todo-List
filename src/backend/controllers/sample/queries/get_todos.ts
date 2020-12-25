import { Todo } from '../../../_types/todo'
const Task = require('../../../models/todo')

export default async (): Promise<Todo[]> => {
  return Task.find({})
}
