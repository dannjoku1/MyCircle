import { gql } from 'react-apollo';

export default gql`
  mutation createChord($text: String!) {
    createChord(text: $text) {
      likeCount
      _id
      createdAt
      text
      user {
        avatar
        userName
        firstName
        lastName
      }
      
    }
  }
`;