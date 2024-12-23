import Account from '../models/account.js';
import User from '../models/user.js';

const getBalance = async (req, res) => {
  try {
    const { userId } = req.params;

    const userAccountBalance = await Account.findOne(
      { userId },
      { balance: 1 }
    );

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
    const { userId } = req.params;

    const customerName = await User.findById(userId);

    const account = await Account.findOne({ userId });

    if (!customerName && account) {
      return res.status(404).json({ msg: 'Account not found' });
    }

    const userAccount = {
      accountId: account._id,
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

export { getBalance, accountDetails };
