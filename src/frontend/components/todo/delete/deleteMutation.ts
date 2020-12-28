import gql from 'graphql-tag'

const delete_todo = gql`
  mutation($id: ID!) {
    todos: delete_todo(id: $id) {
      id
      text
      completed
    }
  }
`

export default delete_todo
