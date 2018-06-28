import jwt from 'jsonwebtoken';

import User from '../models/User';
import constants from '../config/constants';

export async function requireAuth(user) {
  if (!user || !user._id) {
    throw new Error('Unauthorized');
  }

  const me = await User.findById(user._id);

  if (!me) {
    throw new Error('Unauthorized');
  }

  return me;
}

// this funcion takes a token ands splits it inside of an array
export function decodeToken(token) { 
  const arr = token.split(' ');

  if (arr[0] === 'Bearer') { // makes sure first index in array equals Bearer 
    return jwt.verify(arr[1], constants.JWT_SECRET); // verifies that valid jwt is coming from client
  }

  throw new Error('Token not valid!'); // throw error if Bearer is not present 
}