const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type News {
        _id: ID
        sourceId: String
        sourceName: String
        author: String
        title: String
        description: String
        url: String
        image: String
        publishedAt: String
        content: String
    }
    type User {
        _id: ID
        username: String
        email: String
        newsCount: Int
        savedNews: [News]
    }
    type Auth {
        token: ID!
        user: User
    }
    input NewsInput {
        sourceId: String
        sourceName: String
        author: String
        title: String
        description: String
        url: String
        image: String
        publishedAt: String
        content: String
    }
    type Query {
        me: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveNews(input: NewsInput): User
        removeNews(_id: String!): User
    }
`;

module.exports=typeDefs;