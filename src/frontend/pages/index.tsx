import { Todo, TodoItemProps, TodoListProps } from 'frontend/pages/types'
import { makeStyles } from '@material-ui/core/styles'
import { NextPage } from 'next'
import { Typography, TextField, ListItem, Checkbox, Button } from '@material-ui/core'
import React, { ReactElement, useState, useEffect } from 'react'
import AppBar from '../layouts/moduleViewer/AppBar'
import CardContainer from 'frontend/components/_common/CardContainer'

import { useMutation, useQuery } from '@apollo/client'

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
  const [newTodo, setNewTodo] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value)
  }

  const [add_todo] = useMutation(create_todo)

  const handleAdd = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    add_todo({variables: { text: newTodo }})
    setNewTodo("")
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
  const [check_todo] = useMutation(update_todo)
  const [remove_todo]:any = useMutation(delete_todo)

  const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    check_todo({ variables: { id: todo.id, completed: !todo.completed }})
  }

  const handleDelete = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault()
    remove_todo({variables: { id: todo.id }})
  }

  return (
    <ListItem>
      <label style={{ textDecoration: todo.completed ? "line-through" : "none", fontSize: '17px' }} >
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

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <ul style={{ listStyleType: 'none' }}>
      {todos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} />
      })}
    </ul>
  )
}

const Home: NextPage = (): ReactElement => {
  const classes = useStyles()
  const todos_data = useQuery(get_todos)

  const [todolist, setTodolist] = useState([])

  useEffect(() => {
    if (!todos_data.loading) {
      const todoItems: Todo[] = todos_data.data.get_todos || []
      setTodolist(todoItems)
      console.log(todoItems)
    }
  })

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
            <TodoList todos={todolist} />
          </>
        }
      />
    </>
  )
}

export default Home
