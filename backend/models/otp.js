import { model, Schema } from 'mongoose';

const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

const Otp = model('Otp', otpSchema);

export default Otp;
