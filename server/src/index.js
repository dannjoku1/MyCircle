/* eslint-disable no-console */

import express from 'express';

import './config/db';
import constants from './config/constants';
import middlewares from './config/middlewares'
import { createServer } from 'http';
import mocks from './mocks';

const app = express(); // create an instance of express

middlewares(app);

// const PORT = process.env.PORT || 3000; // create the port

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
