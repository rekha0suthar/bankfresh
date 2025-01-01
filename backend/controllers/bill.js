import { scheduleJob } from 'node-schedule';
import Bill from '../models/bill.js';
import Transaction from '../models/transaction.js';
import Account from '../models/account.js';
import mongoose from 'mongoose';

// Method to generate utility bills -- every month -- every user --all utility
const generateBills = async () => {
  try {
    const users = await User.find();
    const bills = [];

    const utilityTypes = ['Electricity', 'Water', 'Internet', 'Gas'];

    users.forEach((user) => {
      const billDate = new Date();
      billDate.setDate(1); // Set to 1st of the month
      billDate.setHours(0, 0, 0, 0); // Clear time part

      const dueDate = new Date(billDate);
      dueDate.setDate(dueDate.getDate() + 30); // 30 days from billDate

      utilityTypes.forEach((utilityType) => {
        const randomAmount = Math.floor(Math.random() * 1000) + 500;

        bills.push({
          userId: user._id,
          billNumber: `${user._id}-${utilityType}-${billDate.toISOString()}`,
          utilityType,
          amount: randomAmount,
          status: 'Pending',
          billDate,
          dueDate,
        });
      });
    });

    await Bill.insertMany(bills);
    console.log('All utility bills generated successfully');
  } catch (err) {
    console.error('Error generating bills:', err.message);
  }
};

// Scheduler to Monthly utility bills -- On the 1st of every month at 10 am
scheduleJob('00 10 1 * *', generateBills);

// @desc  FETCH Bills
// @route GET /api/bill/:userId
// @access private
const getBills = async (req, res) => {
  const { userId } = req.params;
  try {
    const bills = await Bill.find({ userId });
    res.status(200).json(bills);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc  Pay Bill
// @route POST /api/bill/pay-utility-bill
// @access private
const payBill = async (req, res) => {
  const { userId, billNumber, amount } = req.body;
  try {
    let session = await mongoose.startSession();
    session.startTransaction();

    const account = await Account.findOne({ userId });
    if (!account) {
      return res.status(404).json({ msg: 'Account not found' });
    }
    if (account.balance < amount) {
      return res.status(400).json({ msg: 'Insufficient balance' });
    }

    const bill = await Bill.findOne({ userId, billNumber });
    if (!bill) {
      return res.status(404).json({ msg: 'Bill not found' });
    }
    if (bill.status !== 'Pending') {
      return res.status(400).json({ msg: 'Bill is not pending' });
    }
    const updatedBill = await Bill.findByIdAndUpdate(
      bill._id,
      { status: 'Paid' },
      { new: true }
    );
    await Account.findByIdAndUpdate(
      account._id,
      { balance: account.balance - parseFloat(amount) },
      { new: true }
    );
    // Transaction -- for sender -- debit
    await new Transaction({
      accountId: account._id,
      senderAccountNumber: account.accountNumber,
      receiverAccountNumber: bill.billNumber,
      amount: parseFloat(amount), // Store as float
      balance: account.balance - parseFloat(amount), // Store as float
      description: `${bill.utilityType} bill`,
      transactionType: 'Debit',
      status: 'Successful',
    }).save({ session });

    await account.save({ session });
    await session.commitTransaction();
    res.status(200).json({ msg: 'Bill Transaction successful' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export { getBills, payBill };
