import { Todo, AddTodoProps, TodoItemProps, TodoListProps } from 'frontend/pages/types'
import { makeStyles } from '@material-ui/core/styles'
import { NextPage } from 'next'
import { Typography, TextField, ListItem, Checkbox, Button } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'
import AppBar from '../layouts/moduleViewer/AppBar'
import CardContainer from 'frontend/components/CardContainer'
 
const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: theme.spacing(64),
    margin: 'auto'
  },
  padding: {
    padding: theme.spacing(2)
  }
}))

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value)
  } 

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    addTodo(newTodo)
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
        onClick={handleSubmit}
      >Add Todo</Button>
    </form>
  )
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleState, deleteTodo }) => {
  return (
    <ListItem>
      <label style={{ textDecoration: todo.completed ? "line-through" : "none", fontSize: '17px' }} >
        <Checkbox 
          checked={todo.completed}
          onChange={() => toggleState(todo)}
        />
        {todo.text}
      </label>
      <span 
        style={{ marginLeft: '400px', position: 'fixed', cursor: 'pointer' }}
        onClick={() => deleteTodo(todo)}
      >&#10006;</span>
    </ListItem>
  )
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleState, deleteTodo }) => {
  return (
    <ul style={{ listStyleType: 'none' }}>
      {todos.map(todo => {
        return <TodoItem todo={todo} toggleState={toggleState} deleteTodo={deleteTodo} />
      })}
    </ul>
  )
}

const Home: NextPage = (): ReactElement => {
  const classes = useStyles()
  const [todolist, setTodolist] = useState([])

  const toggleState = (selectedTodo: Todo) => {
    const newTodoList = todolist.map(todo => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo
    })
    setTodolist(newTodoList)
  }

  const addTodo = (newTodo: string) => {
    newTodo.trim() !== "" && setTodolist([...todolist, { text: newTodo, completed: false }])
  }

  const deleteTodo = (selectedTodo: Todo) => {
    const index = todolist.indexOf(selectedTodo)
    todolist.splice(index, 1)
    const newTodoList = todolist.map(todo => todo)
    setTodolist(newTodoList)
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
            <AddTodo addTodo={addTodo} />
            <TodoList todos={todolist} toggleState={toggleState} deleteTodo={deleteTodo} />
          </>
        }
      />
    </>
  )
}

export default Home
