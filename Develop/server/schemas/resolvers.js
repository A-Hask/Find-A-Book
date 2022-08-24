const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("books");

        return userData;
      }
      throw new AuthenticationError("You are not logged in");
    },
    users: async () => {
      return User.find().select("-__v -password").populate("books");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("books");
    },
    books: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Book.find(params);
    },
    book: async (parent, { _id }) => {
      return Book.findOne({ bookId });
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Sorry! Incorrect credentials!");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Sorry! Incorrect credentials!");
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const book = await Book.create({
          ...args,
          username: context.user.username,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { books: book.bookId } },
          { new: true }
        );
        return book;
      }
      throw new AuthenticationError("Please log in first!");
    },
  },
};

module.exports = resolvers;
