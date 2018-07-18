import { gql } from 'react-apollo';

export default gql`
  subscription {
    chordAdded {
      text
      _id
      createdAt
      likeCound
      user {
        userName
        avatar
        firstName
        lastName
      }
    }
  }
`;