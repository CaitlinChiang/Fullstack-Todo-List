import { gql, useMutation } from '@apollo/client'
import delete_todo from './deleteMutation'
import React, { ReactElement } from 'react'
import Box from '@material-ui/core/Box'

const DeleteTodo = ({ todoID }): ReactElement => {
  const [remove_todo]:any = useMutation(delete_todo, {
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
            return existingTodos?.filter((x: any): boolean => x?.__ref !== newTodoRef?.__ref)
          }
        }
      })
    }
  })

  return (
      <Box
        component={'span'}
        style={{ marginLeft: '400px', cursor: 'pointer' }}
        onClick={(e) => {
          e.preventDefault()
          remove_todo({ variables: { id: todoID } })
        }}
      >
        &#10006;
      </Box>
  )
}

export default DeleteTodo
