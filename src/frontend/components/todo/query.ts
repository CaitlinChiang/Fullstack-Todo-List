import gql from 'graphql-tag'

const get_todos = gql`
  query {
    todos: get_todos {
      id
      text
      completed
    }
  }
`

export default get_todos
