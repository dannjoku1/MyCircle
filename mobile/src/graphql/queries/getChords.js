import { gql } from 'react-apollo';

import FeedCard from '../../components/FeedCard/FeedCard';

export default gql`
  {
    getChords {
      text
      _id
      createdAt
      likeCount
      user {
        userName
        avatar
        lastName
        firstName
      }
    }
  }
`;