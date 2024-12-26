import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  identityProof: {
    type: String,
    required: true,
    unique: true,
  },
  accountType: {
    type: String,
    enum: ['Saving', 'Current'],
    required: true,
  },
  password: {
    type: String,
  },
  isVerified: {
    type: String,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
  lastLoggedIn: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(this.password, password);
};

userSchema.methods.updateLogin = function () {
  return this.model('User').findOneAndUpdate(
    { email: this.email },
    { lastLoggedIn: new Date() }
  );
};

const User = model('User', userSchema);

export default User;
