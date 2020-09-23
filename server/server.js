// TODO: change to -> import { GraphQLServer } from 'graphql-yoga';
// and add in the babel preset to do this

const { GraphQLServer } = require('graphql-yoga');

const messages = [];

// ! means field is reqired
// make a Query type to get these messages
// a Mutation type is like a POST in the Rest world
const typeDefs = `
  type Message {
    id: ID!
    user: String!
    content: String!
  }

  type Query {
    messages: [Message!]
  }

  type Mutation {
    postMessage(user: String!, content: String!): ID!
  }
`;
// get the data defined in the type definitions with the resolvers
const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    postMessage: (parent, { user, content }) => {
      const id = messages.length;
      messages.push({
        id,
        user,
        content,
      });
      return id;
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(({ port }) => {
  console.log(`Server on http://localhost:${port}/`);
});
