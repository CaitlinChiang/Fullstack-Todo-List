import { Todo, TodoItemProps, TodoListProps } from 'frontend/pages/types'
import { makeStyles } from '@material-ui/core/styles'
import { NextPage } from 'next'
import { Typography, TextField, ListItem, Checkbox, Button } from '@material-ui/core'
import React, { ReactElement, useState, useEffect } from 'react'
import AppBar from '../layouts/moduleViewer/AppBar'
import CardContainer from 'frontend/components/_common/CardContainer'

import { gql, useMutation, useQuery } from '@apollo/client'

import get_todos from '../components/todo/query'
import create_todo from '../components/todo/createMutation'
import update_todo from '../components/todo/updateMutation'
import delete_todo from '../components/todo/deleteMutation'

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: theme.spacing(64),
    margin: 'auto'
  },
  padding: {
    padding: theme.spacing(2)
  }
}))

const AddTodo: React.FC = () => {
  const [newTodo, setNewTodo] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value)
  }

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

  const handleAdd = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    add_todo({ variables: { text: newTodo } })
    setNewTodo('')
  }

  return (
    <form>
      <TextField
        size={'small'}
        color={'primary'}
        variant={'outlined'}
        label="Upcoming Task..."
        type="text"
        value={newTodo}
        onChange={handleChange}
      />
      <Button
        size={'medium'}
        color={'primary'}
        variant={'contained'}
        type="submit"
        onClick={handleAdd}
      >Add Todo</Button>
    </form>
  )
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
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

  const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    check_todo({ variables: { id: todo.id, completed: !todo.completed } })
  }

  const handleDelete = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault()
    remove_todo({ variables: { id: todo.id } })
  }

  return (
    <ListItem>
      <label style={{ textDecoration: todo.completed ? 'line-through' : 'none', fontSize: '17px' }} >
        <Checkbox
          checked={todo.completed}
          onChange={handleUpdate}
        />
        {todo.text}
      </label>
      <span
        style={{ marginLeft: '400px', cursor: 'pointer' }}
        onClick={handleDelete}
      >&#10006;</span>
    </ListItem>
  )
}

const Home: NextPage = (): ReactElement => {
  const classes = useStyles()
  const todos_data = useQuery(get_todos)

  return (
    <>
      <AppBar title='Dashboard Boilerplate Todo-List Project' />

      <Typography color={'textPrimary'} variant={'h4'} className={classes.padding}>
        {'Welcome, Caitlin!'}
      </Typography>

      <CardContainer
        content={
          <>
            <AddTodo />
            <ul style={{ listStyleType: 'none' }}>
              {todos_data?.data?.todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
            </ul>
          </>
        }
      />
    </>
  )
}

export default Home
