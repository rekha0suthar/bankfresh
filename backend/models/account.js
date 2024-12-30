import { model, Schema } from 'mongoose';

const accountSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    unique: true,
    required: true,
  },
  accountType: {
    type: String,
    enum: ['Saving', 'Current'],
    required: true,
  },
  balance: {
    type: Number,
    default: 1000.0,
  },
  customerId: {
    type: String,
    unique: true,
    required: true,
  },
  debitCard: {
    cardNumber: { type: String, unique: true, required: true },
    cvv: { type: String, unique: true, required: true },
    issueMonth: { type: String, required: true },
    issueYear: { type: String, required: true },
    expiryMonth: { type: String, required: true },
    expiryYear: { type: String, required: true },
    pin: { type: String },
    active: { type: Boolean, default: false },
    blocked: { type: Boolean, default: false },
  },
  transactionPassword: {
    type: String,
  },
  beneficiary: {
    type: Array,
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
