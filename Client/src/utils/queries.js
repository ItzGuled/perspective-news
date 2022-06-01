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
        _id
        sourceId
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
