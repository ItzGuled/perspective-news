import { gql } from "@apollo/react-hooks";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_NEWS = gql`
  mutation saveNews($input: newsInput!) {
    saveNews(input: $input) {
      _id
      username
      email
      savedNews {
        
      }
    }
  }
`;

export const REMOVE_NEWS = gql`
  mutation removeNews($newsId: String!) {
    removeNews(newsId: $newsId) {
      _id
      username
      email
      savedNews {

      }
    }
  }
`;
