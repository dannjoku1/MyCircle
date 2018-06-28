import mongoose, { Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from "jsonwebtoken";

import constants from '../config/constants';

const UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
  },
  firstName: String,
  lastName: String,
  avatar: String,
  password: String,
  email: String,
}, { timestamps: true });

// before Mongodb gets password, it will be saved as a hashed password 
UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) { // authenticates password coming in from client and returns a boolean
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign(
      {
        _id: this._id, // returns _id as part of payload where _id equals the instance of the user
      },
      constants.JWT_SECRET, // makes jwtsecret the password for the token
    );
  },
};

export default mongoose.model('User', UserSchema);