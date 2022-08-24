import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query books($title: String) {
    books(title: $title) {
      bookId
      authors
      description
      image
      link
    }
  }
`;

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks
    }
  }
`;

export const GET_BOOK = gql`
  query book($bookId: bookId!) {
    book(bookId: $bookId) {
      bookId
      authors
      description
      image
      link
    }
  }
`;
