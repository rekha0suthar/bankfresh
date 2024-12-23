import Account from '../models/account.js';
import Transaction from '../models/transaction.js';
import User from '../models/user.js';
import { generateAndSendOtp } from './otp.js';
import bcrypt from 'bcrypt';

const setTransactionPassword = async (req, res) => {
  try {
    const { debitCard, transactionPassword } = req.body;
    const account = await Account.findOne({ debitCard });
    if (!account) {
      return res.status(404).json({ message: 'Debit card not found' });
    }
    account.transactionPassword = await bcrypt.hash(transactionPassword, 10);

    await account.save();
    res.status(200).json({ msg: 'Transaction password set' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const addTransaction = async (req, res) => {
  const { accountId, receiverAccountNumber, amount, purpose } = req.body;
  try {
    const senderAccount = await Account.findOne({ _id: accountId });
    if (!senderAccount) {
      return res.status(404).json({ msg: 'Sender account not found' });
    }

    if (senderAccount.balance < amount) {
      return res.status(400).json({ msg: 'Insufficient balance' });
    }

    const receiverAccount = await Account.findOne({
      accountNumber: receiverAccountNumber,
    });
    if (!receiverAccount) {
      return res.status(404).json({ msg: 'Receiver account not found' });
    }

    const senderTransaction = await new Transaction({
      accountId,
      senderAccountNumber: senderAccount.accountNumber,
      receiverAccountNumber,
      amount,
      description: purpose,
      transactionType: 'Debit',
      status: 'Successful',
    }).save();

    const receiverTransaction = await new Transaction({
      accountId: receiverAccount._id,
      senderAccountNumber: senderAccount.accountNumber,
      receiverAccountNumber: receiverAccount.accountNumber,
      amount,
      description: purpose,
      transactionType: 'Credit',
      status: 'Successful',
    }).save();

    senderAccount.balance -= parseInt(amount);
    await senderAccount.save();
    receiverAccount.balance += parseInt(amount);
    await receiverAccount.save();

    res.status(201).json({
      msg: 'Transaction successful',
      senderTransaction,
      receiverTransaction,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const sendOtp = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId, { email: 1, mobileNumber: 1 });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    await generateAndSendOtp(user.email, user.mobileNumber);
    res.json({ msg: 'Otp sent successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const verifyTransactionPassword = async (req, res) => {
  const { accountId, transactionPassword } = req.body;
  try {
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ msg: 'Account not found' });
    }
    const isPasswordCorrect = bcrypt.compare(
      transactionPassword,
      account.transactionPassword
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: 'Incorrect transaction password' });
    }

    res.json({ msg: 'Transaction password verified successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export {
  addTransaction,
  sendOtp,
  verifyTransactionPassword,
  setTransactionPassword,
}; // Export the functions
