/* eslint-disable no-console */

import express from 'express';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import bodyParser from 'body-parser'; 

import './config/db';
import constants from './config/constants';
import typeDefs from '../graphql/schema';
import resolvers from '../graphql/resolvers'; // pulling from index.js 
import { createServer } from 'http';
import mocks from '../mocks';

const app = express(); // create an instance of express

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// const PORT = process.env.PORT || 3000; // create the port

app.use(bodyParser.json()); // add body-parser as the json parser middleware

// graphiql is responsible for the id 
// adding endpoint url based on constant
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: constants.GRAPHQL_PATH,
  }),
);

app.use(
  constants.GRAPHQL_PATH,
  graphqlExpress({
    schema
  }),
);

const graphQLServer = createServer(app);

mocks().then(() => {
  graphQLServer.listen(constants.PORT, err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`App running on port: ${constants.PORT}`);
    }
  });
});
