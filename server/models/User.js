import mongoose, { Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';

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
};

export default mongoose.model('User', UserSchema);