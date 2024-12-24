import Account from '../models/account.js';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const getBalance = async (req, res) => {
  try {
    const { accountId } = req.params;

    const userAccountBalance = await Account.findById(accountId, {
      balance: 1,
    });

    if (!userAccountBalance) {
      return res.status(404).json({ msg: 'Account not found' });
    }
    res.status(200).json(userAccountBalance);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const accountDetails = async (req, res) => {
  try {
    const { accountId } = req.params;

    const account = await Account.findById(accountId);
    const customerName = await User.findOne({ _id: account.userId });

    if (!customerName && account) {
      return res.status(404).json({ msg: 'Account not found' });
    }

    const userAccount = {
      accountId,
      customerName,
      accountNumber: account.accountNumber,
      accountType: account.accountType,
      balance: account.balance,
    };

    res.status(200).json(userAccount);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getDebitCard = async (req, res) => {
  try {
    const { accountId } = req.params;
    const userDebitCard = await Account.findById(accountId, { debitCard: 1 });

    if (!userDebitCard) {
      return res.status(404).json({ msg: 'Account not found' });
    }
    res.status(200).json(userDebitCard);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const blockUnblockDebitCart = async (req, res) => {
  try {
    const { debitCard } = req.body;

    const account = await Account.findOne({ debitCard });

    if (!account) {
      return res.status(404).json({ message: 'Debit card not found' });
    }
    if (account.debitCard.blocked) {
      account.debitCard.blocked = false;
      await account.save();
      return res.status(200).json({ msg: 'Card unblocked' });
    }
    account.debitCard.blocked = true;
    await account.save();
    res.status(200).json({ msg: 'Card blocked' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const generateCardPin = async (req, res) => {
  const { debitCard, pin } = req.body;
  try {
    const account = await Account.findOne({ debitCard });
    if (!account.debitCard) {
      return res.status(404).json({ message: 'Debit card not found' });
    }
    account.debitCard.pin = pin;
    account.debitCard.active = true;
    await account.save();
    res.status(200).json({ msg: 'Card pin generated' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAccount = async (req, res) => {
  try {
    const { accountNumber } = req.body;
    const account = await Account.findOne({ accountNumber }, { userId: 1 });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    const userName = await User.findById(
      { _id: account.userId },
      { fullName: 1, _id: 0 }
    );
    if (!userName) {
      return res.status(404).json({ message: 'User not found' });
    }
    const accountDetails = {
      accountNumber,
      customerName: userName.fullName,
    };
    res.status(200).json(accountDetails);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export {
  getBalance,
  getDebitCard,
  accountDetails,
  blockUnblockDebitCart,
  generateCardPin,
  getAccount,
};
