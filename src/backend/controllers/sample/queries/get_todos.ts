import { Todo } from '../../../_types/todo'

export default (): Todo[] => {
  return [
    {
      id: '1',
      text: 'Hello',
      completed: false
    },
    {
      id: '2',
      text: 'Hello2',
      completed: true
    },
    {
      id: '3',
      text: 'Hello3',
      completed: false
    }
  ]
}
