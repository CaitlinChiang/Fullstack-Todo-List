import gql from 'graphql-tag'

const create_todo = gql`
  mutation($text: String!) {
    todos: create_todo(text: $text) {
      id
      text
      completed
    }
  }
`

export default create_todo
