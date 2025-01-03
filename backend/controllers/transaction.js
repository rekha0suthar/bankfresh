import Account from '../models/account.js';
import Transaction from '../models/transaction.js';
import User from '../models/user.js';
import { convertToCSV, getQuery } from '../utils/index.js';
import { generateAndSendOtp } from './otp.js';
import bcrypt from 'bcrypt';
import PDFDocument from 'pdfkit';
import mongoose from 'mongoose';
import { getSession } from '../index.js';

// @desc  Set Transaction Password
// @route POST /api/transaction/set-transaction-password
// @access private
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
    res.status(500).json({ msg: 'Internal server error' });
  }
};

// @desc  Add Transaction
// @route POST /api/transaction/money-transfer
// @access private
const addTransaction = async (req, res) => {
  const { accountId, receiverAccountNumber, amount, purpose } = req.body;

  if (isNaN(amount) || parseFloat(amount) <= 0) {
    return res.status(400).json({ msg: 'Invalid amount' });
  }

  const floatAmount = parseFloat(amount); // Ensure amount is parsed as a float
  let session;

  try {
    session = await getSession();
    session.startTransaction();

    const senderAccount = await Account.findOne({ _id: accountId }).session(
      session
    );
    if (!senderAccount) {
      return res.status(404).json({ msg: 'Sender account not found' });
    }

    // Handle same-account transaction: prevent or treat it differently
    if (senderAccount.accountNumber === receiverAccountNumber) {
      return res
        .status(400)
        .json({ msg: 'Cannot transfer to the same account' });
    }

    if (senderAccount.balance < floatAmount) {
      return res.status(400).json({ msg: 'Insufficient balance' });
    }

    if (!senderAccount.transactionPassword) {
      return res.status(400).json({ msg: 'Set Transaction password' });
    }

    if (!senderAccount.debitCard.active || senderAccount.debitCard.blocked) {
      return res
        .status(400)
        .json({ msg: 'Card is either blocked or inactive' });
    }

    if (!senderAccount.debitCard.pin) {
      return res.status(400).json({ msg: 'Set card pin' });
    }

    const receiverAccount = await Account.findOne({
      accountNumber: receiverAccountNumber,
    }).session(session);
    if (!receiverAccount) {
      return res.status(404).json({ msg: 'Receiver account not found' });
    }

    // Transaction -- for sender -- debit
    await new Transaction({
      accountId,
      senderAccountNumber: senderAccount.accountNumber,
      receiverAccountNumber,
      amount: floatAmount, // Store as float
      balance: senderAccount.balance - floatAmount, // Store as float
      description: purpose,
      transactionType: 'Debit',
      status: 'Successful',
    }).save({ session });

    // Transaction -- for receiver -- credit
    await new Transaction({
      accountId: receiverAccount._id,
      senderAccountNumber: senderAccount.accountNumber,
      receiverAccountNumber,
      amount: floatAmount, // Store as float
      balance: receiverAccount.balance + floatAmount, // Store as float
      description: purpose,
      transactionType: 'Credit',
      status: 'Successful',
    }).save({ session });

    // Update balances
    senderAccount.balance -= floatAmount;
    receiverAccount.balance += floatAmount;

    await senderAccount.save({ session });
    await receiverAccount.save({ session });

    await session.commitTransaction();
    res.status(200).json({ msg: 'Transaction successful' });
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    return res.status(500).json({ msg: 'Server error', error: error.message });
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

// Method to send otp
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

// @desc  Verify Transaction Password
// @route POST /api/transaction/verify-transaction-password
// @access private
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

// @desc  Fetch Transactions
// @route POST /api/transaction/:accountId
// @access private
const getTransactions = async (req, res) => {
  const { accountId } = req.params;
  const {
    page = 1,
    limit = 1,
    startDate,
    endDate,
    transactionType,
  } = req.query;

  try {
    const account = await Account.findById(accountId);
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);

    if (!account) {
      return res.status(404).json({ msg: 'Account not found' });
    }

    const query = getQuery(startDate, endDate, transactionType, accountId);

    const totalTransactions = await Transaction.find(query).countDocuments();
    const totalPages = Math.ceil(totalTransactions / limitInt);

    const transactions = await Transaction.find(query)
      .sort({ transactionDate: -1 })
      .skip((pageInt - 1) * limitInt)
      .limit(limitInt);

    res.status(200).json({ transactions, totalPages, currentPage: pageInt });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Method to convert transactions into csv format
const csvStatement = (transactions, res) => {
  const csv = convertToCSV(transactions);
  res.header('Content-Type', 'text/csv');
  res.attachment('account-statement.csv');
  res.send(csv);
};

// Method to convert transactions into pdf format
const pdfStatement = (transactions, res) => {
  if (!transactions || transactions.length === 0) {
    return res
      .status(404)
      .json({ msg: 'No transactions found for this account.' });
  }

  const doc = new PDFDocument();
  const fileName = 'statement.pdf';

  // Set response headers
  res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
  res.setHeader('Content-type', 'application/pdf');

  // Pipe the PDF into the response
  doc.pipe(res);

  // Add a title
  doc.fontSize(25).text('Account Statement', { align: 'center' });
  doc.moveDown();

  // Add a line
  doc.moveTo(50, 100).lineTo(550, 100).stroke();

  // Add table headers
  const headers = ['Transaction Date', 'Description', 'Amount', 'Balance'];
  const tableTop = 120;
  const rowHeight = 20;

  // Draw headers
  headers.forEach((header, index) => {
    doc.fontSize(12).text(header, 50 + index * 120, tableTop);
  });

  // Draw each transaction
  transactions.forEach((transaction, rowIndex) => {
    doc.text(
      transaction.transactionDate.toLocaleString(),
      50,
      tableTop + rowHeight * (rowIndex + 1)
    );
    doc.text(
      transaction.description,
      200,
      tableTop + rowHeight * (rowIndex + 1)
    );
    doc.text(
      `₹ ${transaction.amount} ${
        transaction.transactionType === 'Debit' ? 'Dr' : 'Cr'
      }`,
      290,
      tableTop + rowHeight * (rowIndex + 1)
    );
    doc.text(
      `₹ ${transaction.balance}`,
      410,
      tableTop + rowHeight * (rowIndex + 1)
    );
  });

  // Add a footer
  doc.moveDown(50);
  doc
    .fontSize(10)
    .text('Thank you for using our service!', { align: 'center' });

  // Finalize the PDF and end the stream
  doc.end();
};

// @desc  Download Transactions
// @route POST /api/transaction/:accountId/download-transaction/:type
// @access private
const downLoadStatement = async (req, res) => {
  const { accountId, type } = req.params;
  const { startDate, endDate, transactionType } = req.query;
  try {
    const query = getQuery(startDate, endDate, transactionType, accountId);

    const transactions = await Transaction.find(query).sort({
      transactionDate: -1,
    });

    if (type === 'csv') {
      csvStatement(transactions, res);
    } else {
      pdfStatement(transactions, res);
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export {
  addTransaction,
  sendOtp,
  verifyTransactionPassword,
  setTransactionPassword,
  getTransactions,
  downLoadStatement,
}; // Export the functions
