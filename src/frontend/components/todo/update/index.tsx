import { gql, useMutation } from '@apollo/client'
import update_todo from './updateMutation'
import React, { ReactElement } from 'react'
import Checkbox from '@material-ui/core/Checkbox'

const UpdateTodo = ({ todoID, todoState }): ReactElement => {
  const [check_todo] = useMutation(update_todo, {
    update(cache, { data: { todos } }) {
      cache.modify({
        fields: {
          get_todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: todos,
              id: cache.identify(todos),
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  text
                  completed
                }
              `
            })
            return [...(existingTodos?.filter((x: any): boolean => x?.__ref !== newTodoRef?.__ref)), newTodoRef]
          }
        }
      })
    }
  })

  return (
    <Checkbox
      checked={todoState}
      onChange={() => {
        check_todo({ variables: { id: todoID, completed: !todoState } })
      }}
    />
  )
}

export default UpdateTodo
