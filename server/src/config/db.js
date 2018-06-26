import mongoose from 'mongoose';

import constants from './constants';

mongoose.Promise = global.Promise; // needed or else we will get error about deprication

mongoose.set('debug', true); // debug mode on

try {
  // needed for testing
  mongoose.connect(
    constants.DB_URL,
    {
      useMongoClient: true,
    },
  );
} catch (err) {
  // create connection if connection none
  mongoose.createConnection(constants.DB_URL, {
    useMongoClient: true,
  });
}

mongoose.connection // if exerything works we should see mongodb running
  .once('open', () => console.log('MongoDB Running'))
  .on('error', e => {
    throw e;
  });
