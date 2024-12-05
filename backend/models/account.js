import { model, Schema } from 'mongoose';

const accountSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    unique: true,
  },
  accountType: {
    type: String,
    enum: ['Saving', 'Current'],
  },
  customerId: {
    type: String,
    unique: true,
  },
  debitCard: {
    cardNumber: { type: String, unique: true },
    cvv: { type: String },
  },

  balance: {
    type: Number,
    default: 1000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Account = model('Account', accountSchema);

export default Account;
