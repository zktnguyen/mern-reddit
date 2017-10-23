import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: [5, 'Username is too short. Must be 5 characters or more.']
  },
  password: {
    type: String,
    required: true,
    minLength: [8, 'Password too short. Must be 8 characters or more.']
  }
});

// write some encryption for password

const User = mongoose.model('User', userSchema);

export default User;