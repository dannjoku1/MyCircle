/* eslint-disable no-param-reassign */
import bodyParser from 'body-parser'; 

import { decodeToken } from '../services/auth';

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
}