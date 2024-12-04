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
  customerId: {
    type: String,
    unique: true,
  },
  debitCard: {
    cardNumber: { type: String, unique: true },
    cvv: { type: String },
  },
  mobileNumer: {
    type: String,
    required: true,
  },
});

const Account = model('Account', accountSchema);

export default Account;
