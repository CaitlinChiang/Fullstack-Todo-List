import { gql, useMutation } from '@apollo/client'
import create_todo from './createMutation'
import React, { ReactElement, useState } from 'react'
import { TextField, Button } from '@material-ui/core'

const AddTodo = (): ReactElement => {
  const [newTodo, setNewTodo] = useState<string>('')

  const [add_todo] = useMutation(create_todo, {
    update(cache, { data: { todos } }) {
      cache.modify({
        fields: {
          get_todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: todos,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  text
                  completed
                }
              `
            })
            return [...existingTodos, newTodoRef]
          }
        }
      })
    }
  })

  return (
    <form>
      <TextField
        size={'small'}
        color={'primary'}
        variant={'outlined'}
        label="Upcoming Task..."
        type="text"
        value={newTodo}
        onChange={(e) => {
          setNewTodo(e.target.value)
        }}
      />
      <Button
        size={'medium'}
        color={'primary'}
        variant={'contained'}
        type="submit"
        onClick={(e) => {
          e.preventDefault()
          add_todo({ variables: { text: newTodo } })
          setNewTodo('')
        }}
      >Add Todo</Button>
    </form>
  )
}

export default AddTodo
