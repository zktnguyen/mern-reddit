import mongoose from 'mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: [5, 'Username is too short. Must be 5 characters or more.'],
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  email: {
    type: String, 
    required: true, 
    lowercase: true, 
    index: true, 
    unique: true
  },
  confirmed: { type: Boolean, default: false },
  confirmationToken: { type: Boolean, default: "" },
  createdAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

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

userSchema.methods.generateJWT = function generateJWT() {
  return jwt.sign({
    email: this.email,
    confirmed: this.confirmed
  }, process.env.JWT_SECRET);
};

userSchema.methods.setConfirmationToken = function setConfirmationToken() {
  this.confirmationToken = this.generateJWT();
};

userSchema.methods.generateConfirmationURL = function generateConfirmationURL() {

};

userSchema.methods.generateResetPasswordURL = function generateResetPasswordURL() {

};



userSchema.methods.generateResetPasswordToken = function generateResetPasswordToken() {

};

userSchema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    confirmed: this.confirmed,
    token: this.generateJWT()
  }
};

const User = mongoose.model('User', userSchema);

export default User;