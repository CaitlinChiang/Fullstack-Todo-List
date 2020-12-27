import { Todo } from '../../../_types/todo'
import Task from '../../../models/todo'

export default async (): Promise<Todo[]> => {
  return Task.find({})
}
