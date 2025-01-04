import Account from '../models/account.js';
import User from '../models/user.js';

// @desc  Fetch Account Balance
// @route GET /api/account/:accountId/balance
// @access private
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

// @desc  Fetch Account Summary
// @route GET /api/account/:accountId/account-summary
// @access private
const accountSummary = async (req, res) => {
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

// @desc  Fetch Debit Card
// @route GET /api/account/:accountId/debit-card
// @access private
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

// @desc  Block/Unblock Card
// @route POST /api/account/block-unblock-card
// @access private
const blockUnblockDebitCart = async (req, res) => {
  try {
    const { debitCard } = req.body;

    const account = await Account.findOne({ debitCard });

    if (!account) {
      return res.status(404).json({ msg: 'Debit card not found' });
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
    res.status(500).json({ msg: 'Internal server error' });
  }
};

// @desc  Set Debit Card
// @route POST /api/account/generate-pin
// @access private
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
    res.status(500).json({ msg: 'Internal server error' });
  }
};

// @desc  Fetch Account Details
// @route GET /api/account/
// @access private
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
      return res.status(404).json({ msg: 'User not found' });
    }
    const accountSummary = {
      accountNumber,
      customerName: userName.fullName,
    };
    res.status(200).json(accountSummary);
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error' });
  }
};

// @desc  Add Beneficiary
// @route POST /api/account/add-beneficiary
// @access private
const addBeneficiary = async (req, res) => {
  const { accountId, accountNumber, beneficiaryName } = req.body;
  try {
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ msg: 'Account not found' });
    }

    const beneficiaryAccount = await Account.findOne({ accountNumber });

    const user = await User.findById(beneficiaryAccount.userId, {
      fullName: 1,
    });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const existBeneficiary = account.beneficiary.find(
      (ben) => ben.accountNumber === accountNumber
    );
    if (existBeneficiary) {
      return res.status(409).json({ msg: 'Beneficiary already exists' });
    }
    account.beneficiary.push({
      accountId: beneficiaryAccount._id,
      accountNumber,
      beneficiaryName,
      realName: user.fullName,
    });
    await account.save();
    res.status(200).json({ msg: 'Beneficiary added successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error' });
  }
};

// @desc  Fetch Beneficiaries
// @route GET /api/account/:accountId/beneficiaries
// @access private
const getBeneficiaries = async (req, res) => {
  const { accountId } = req.params;
  try {
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ msg: 'Account not found' });
    }
    const beneficiaries = account.beneficiary;
    res.status(200).json(beneficiaries);
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export {
  getBalance,
  getDebitCard,
  accountSummary,
  blockUnblockDebitCart,
  generateCardPin,
  getAccount,
  addBeneficiary,
  getBeneficiaries,
};
