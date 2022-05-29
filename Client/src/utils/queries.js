//placeholder
import { gql } from "@apollo/react-hooks";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      newsCount
      savedNews {
        sourceID
        sourceName
        author
        title
        description
        url
        image
        publishedAt
        content
      }
    }
  }
`;
