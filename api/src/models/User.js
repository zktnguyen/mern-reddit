import mongoose from 'mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: [5, 'Username is too short. Must be 5 characters or more.']
  },
  passwordHash: {
    type: String,
    required: true
  }
});

// write some encryption for password
export function cryptPassword(password) {
  return hashSync(password, genSaltSync(10));
};

export function comparePassword(password) {
  return compareSync(password, this.passwordHash);
};

userSchema.methods.isValidPassword = function isValidPassword(password) {
  return comparePassword(password);
};

userSchema.methods.setPassword = function setPassword(password) {
  this.passwordHash = cryptPassword(password);
};

const User = mongoose.model('User', userSchema);

export default User;