import { Schema, model } from 'mongoose';

const billSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  billNumber: { type: String, required: true },
  billDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  utilityType: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  dueDate: { type: Date, default: Date.now },
});

const Bill = model('Bill', billSchema);

export default Bill; // Export the model
