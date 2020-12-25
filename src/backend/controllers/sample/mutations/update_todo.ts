import { Todo } from '../../../_types/todo'

export default (_root: undefined, args: { id: string, completed: boolean }): Todo => {
  return {
    id: args.id,
    text: `We are updating todo number ${args.id}.`,
    completed: args.completed
  }
}
