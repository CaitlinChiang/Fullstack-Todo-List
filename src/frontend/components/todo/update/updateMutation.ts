import gql from 'graphql-tag'

const update_todo = gql`
  mutation($id: ID!, $completed: Boolean!) {
    todos: update_todo(id: $id, completed: $completed) {
      id
      text
      completed
    }
  }
`

export default update_todo
