const { gql } = require("apollo-server-express");

//need help setting typeDefs for Book, Query, and Mutation. Do I need one for Author?
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID
        authors: [Author]
        description: String
        title: String
        image: 
        link: 
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        books(username: String): [Book]

    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(Author: String!, description: String, title: String!, bookId: Int, image: , link: ): User

    }
`;

module.exports = typeDefs;
