import { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import AppBar from '../layouts/moduleViewer/AppBar'
import CardContainer from '../components/_common/CardContainer'
import get_todos from 'frontend/components/todo/query'
import AddTodo from 'frontend/components/todo/create'
import UpdateTodo from 'frontend/components/todo/update'
import DeleteTodo from 'frontend/components/todo/delete'
import { TodoItemProps } from 'frontend/pages/types'
import React, { ReactElement } from 'react'
import { Typography, ListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: theme.spacing(64),
    margin: 'auto'
  },
  padding: {
    padding: theme.spacing(2)
  }
}))

const Home: NextPage = (): ReactElement => {
  const classes = useStyles()
  const todos_data = useQuery(get_todos)

  const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    return (
      <ListItem>
        <label style={{ textDecoration: todo.completed ? 'line-through' : 'none', fontSize: '17px' }} >
          <UpdateTodo 
            todoID={todo.id} 
            todoState={todo.completed} 
          />
          {todo.text}
        </label>
        <DeleteTodo 
          todoID={todo.id} 
        />
      </ListItem>
    )
  }

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
