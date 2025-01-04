import Account from '../models/account.js';
import CreditCard from '../models/creditCard.js';
import { generateCreditCard } from '../utils/index.js';

// @desc  Apply for a credit card
// @route POST /api/account/apply-credit-card
// @access private
const applyCreditCard = async (req, res) => {
  const { userId, accountNumber, cardHolder, cardType, billingAddress } =
    req.body;
  try {
    const account = await Account.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({ msg: 'Account not found' });
    }

    const creditCard = await CreditCard.findOne({ userId, cardType });
    if (creditCard) {
      return res
        .status(409)
        .json({ msg: 'Credit card of this type already exists' });
    }

    // Generate a new credit card after 1 hour
    setTimeout(async () => {
      const { cardNumber, cvv, expirationDate } = generateCreditCard();

      await new CreditCard({
        userId,
        cardNumber,
        cvv,
        expirationDate,
        cardHolder,
        billingAddress,
        cardType,
      }).save();
    }, 3600);

    //Immediate response to the user
    res
      .status(200)
      .json({ msg: 'Credit card application submitted successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc  Fetch Credit cards
// @route GET /api/account/:userId/credit-card
// @access private
const getCreditCard = async (req, res) => {
  const { userId } = req.params;
  try {
    const creditCards = await CreditCard.find({ userId });
    res.status(200).json(creditCards);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc  Block/Unblock credit card
// @route POST /api/account/block-unblock-credit-card
// @access private
const blockUnblockCreditCart = async (req, res) => {
  const { userId, cardId } = req.body;
  try {
    const creditCard = await CreditCard.findOne({ _id: cardId, userId });
    if (!creditCard) {
      return res.status(404).json({ msg: 'Credit card not found' });
    }
    creditCard.cardStatus =
      creditCard.cardStatus === 'Active' ? 'Blocked' : 'Active';
    await creditCard.save();
    res.status(200).json({ msg: 'Credit card status updated successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export { applyCreditCard, getCreditCard, blockUnblockCreditCart };
