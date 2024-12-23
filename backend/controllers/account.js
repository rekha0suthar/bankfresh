import Account from '../models/account.js';

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

export { getBalance };
