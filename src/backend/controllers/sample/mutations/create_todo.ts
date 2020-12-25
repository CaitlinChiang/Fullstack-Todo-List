import { Todo } from '../../../_types/todo'

export default (_root: undefined, args: { id: string, text: string }): Todo => {
  return {
    id: args.id,
    text: args.text,
    completed: false
  }
}
