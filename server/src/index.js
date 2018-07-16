/* eslint-disable no-console */
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import express from 'express';
import { makeExecutableSchema } from 'graphql-tools';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers'; // pulling from index.js 
import constants from './config/constants';
import middlewares from './config/middlewares'
import './config/db';
import mocks from './mocks';

const app = express(); // create an instance of express

middlewares(app);

// graphiql is responsible for the id 
// adding endpoint url based on constant
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: constants.GRAPHQL_PATH,
      subscriptionsEndpoint: `ws://localhost:${constants.PORT}${constants.SUBSCRIPTIONS_PATH}`
    }),
  );

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  app.use(
    constants.GRAPHQL_PATH,
    graphqlExpress(req => ({
      schema,
      context: {
        user: req.user
      }
    })),
  );

// const PORT = process.env.PORT || 3000; // create the port

const graphQLServer = createServer(app);

// faker eliminated need for mocks... may revisit
//mocks().then(() => {
  graphQLServer.listen(constants.PORT, err => {
    if (err) {
      console.error(err);
    } else {
      new SubscriptionServer({ // eslint-disable-line
        schema,
        execute,
        subscribe
      }, {
        server: graphQLServer,
        path: constants.SUBSCRIPTIONS_PATH
      })

      console.log(`App listen to port: ${constants.PORT}`);
    }
  });
// });
