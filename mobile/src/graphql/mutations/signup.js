import { gql } from 'react-apollo';

export default gql`
  mutation signup(
    $fullName: String!
    $email: String!
    $password: String!
    $userName: String!
    $avatar: String
  ) {
    signup(
      fullName: $fullName
      email: $email
      password: $password
      userName: $userName
      avatar: $avatar
    ) {
      token
    }
  }
`;