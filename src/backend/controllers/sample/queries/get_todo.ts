import { Todo } from '../../../_types/todo'
//import mongoose from 'mongoose'

export default (_root: undefined, args: { id: string }): Todo => {
  return {
    id: args.id,
    text: `We are getting todo number ${args.id}.`,
    completed: false
  }
}
