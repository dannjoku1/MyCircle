/* eslint-disable no-param-reassign */

import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import bodyParser from 'body-parser'; 

import typeDefs from '../graphql/schema';
import resolvers from '../graphql/resolvers'; // pulling from index.js 
import constants from './constants';
import { decodeToken } from '../services/auth';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

async function auth(req, res, next) {
  try { // 1. for each request
    const token = req.headers.authorization; //2. checks if user has header authorization
    if (token != null) {
      const user = await decodeToken(token); // decode token, getting user id, put it inside request object 
      req.user = user; // eslint-disable-line
    } else {
      req.user = null; // eslint-disable-line
    }
    next();
  } catch (error) {
    throw error;
  }
}

export default app => {
  app.use(bodyParser.json()); // add body-parser as the json parser middleware
  app.use(auth);
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
    graphqlExpress(req => ({
      schema,
      context: {
        user: req.user
      }
    })),
  );
}