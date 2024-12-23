import { model, Schema } from 'mongoose';

const transactionSchema = new Schema({
  accountId: {
    type: String,
    required: true,
  },
  senderAccountNumber: {
    type: String,
    required: true,
  },
  receiverAccountNumber: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = model('Transaction', transactionSchema);

export default Transaction;
