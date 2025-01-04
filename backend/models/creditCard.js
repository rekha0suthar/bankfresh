import { Schema, model } from 'mongoose';

const creditCardSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
      unique: true,
    },
    cardHolder: {
      type: String,
      required: true,
    },
    expirationDate: {
      type: String,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
    },
    cardType: {
      type: String,
      enum: ['Basic', 'Gold', 'Platinum'],
      required: true,
      unique: true,
    },
    cardStatus: {
      type: String,
      enum: ['Active', 'Inactive', 'Blocked'],
      default: 'Active',
    },
    cardLimit: {
      type: Number,
      default: function () {
        // Set default credit limit based on card type
        if (this.cardType === 'Basic') return 50000;
        if (this.cardType === 'Gold') return 100000;
        if (this.cardType === 'Platinum') return 250000;
        return 50000; // Fallback default
      },
    },
    cardBalance: {
      type: Number,
      default: function () {
        return this.cardLimit;
      },
    },
    issueDate: {
      type: Date,
      default: Date.now,
    },
    billingAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CreditCard = model('CreditCard', creditCardSchema);

export default CreditCard;
