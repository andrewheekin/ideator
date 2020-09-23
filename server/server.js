// TODO: change to -> import { GraphQLServer } from 'graphql-yoga';
// and add in the babel preset to do this

const { GraphQLServer } = require('graphql-yoga');

// ! means field is reqired
// make a Query type to get these messages
const typeDefs = `
  type Message {
    id: ID!
    user: String!
    content: String!
  }

  type Query {
    messages: [Message!]
  }
`;
// get the data defined in the type definitions with the resolvers
const resolvers = {
  Query: {
    messages: () => messages,
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(({ port }) => {
  console.log(`Server on http://localhost:${port}/`);
});
