import nodemailer from 'nodemailer';

export const generateAccountNumber = () => {
  return `123${Math.floor(10000 + Math.random() * 90000)}`;
};

export const generateCustomerId = () => {
  return `CUST${Math.floor(100000 + Math.random() * 900000)}`;
};

export const generateDebitCardDetails = () => {
  // Generate a random 16 digit debit card number
  const cardNumber = `5${Math.floor(
    100000000000000 + Math.random() * 900000000000000
  )}`;

  // Generate a random 3 digit cvv
  const cvv = Math.floor(100 + Math.random() * 900);

  // Generate issue date (current month and year)
  const issueMonth = new Date().getMonth() + 1;
  const issueYear = new Date().getFullYear();

  // Generate expiry date(2 years from now)
  const expiryMonth = (issueMonth + 24) % 12 || 12;
  const expiryYear = issueYear + Math.floor((issueMonth + 24) / 12);
  return { cardNumber, cvv, issueMonth, issueYear, expiryMonth, expiryYear };
};

export const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: text,
  };

  await transporter.sendMail(mailOptions);
};

export const convertToCSV = (transactions) => {
  const header = ['Transaction Date', 'Descritpion', 'Amount', 'Balance'];
  const rows = transactions.map((transaction) => [
    new Date(transaction.transactionDate),
    `${transaction.description} / from ${
      transaction.senderAccountNumber
    } / to ${transaction.receiverAccountNumber}/ ${new Date(
      transaction.transactionDate
    )}`,
    `₹ ${transaction.amount} ${
      transaction.transactionType === 'Debit' ? 'Dr' : 'Cr'
    }`,
    `₹ ${transaction.balance}`,
  ]);

  const csvContent = [header, ...rows].map((e) => e.join(',')).join('\n');
  return csvContent;
};

export const getQuery = (startDate, endDate, transactionType, accountId) => {
  // Convert startDate and endDate to ISO format
  const start = new Date(startDate).toISOString();
  const end = new Date(endDate).toISOString();

  // Build the query object
  const query = {
    accountId,
    transactionDate: { $gte: start, $lte: end },
  };

  // Add transaction type filtering
  query.transactionType = {
    $in: transactionType.split(',').map((type) => type.trim()),
  };
  return query;
};

export const validateTransactionDetails = (
  senderAccount,
  receiverAccount,
  amount
) => {
  if (isNaN(amount) || parseFloat(amount) <= 0) {
    throw new Error('Invalid amount');
  }
  if (senderAccount.balance < amount) {
    throw new Error('Insufficient balance');
  }
  if (senderAccount.accountNumber === receiverAccount.accountNumber) {
    throw new Error('Cannot transfer to the same account');
  }
  if (!senderAccount.transactionPassword) {
    throw new Error('Set Transaction password');
  }
  if (!senderAccount.debitCard.active || senderAccount.debitCard.blocked) {
    throw new Error('Card is either blocked or inactive');
  }
  if (!senderAccount.debitCard.pin) {
    throw new Error('Set card pin');
  }
};

export const sendTransactionEmail = async (
  user,
  amount,
  type,
  accountNumber
) => {
  const subject = 'Transaction Details';
  const text = `Hello ${
    user.fullName
  }, \n\n Rs ${amount} has been ${type.toUpperCase()} to your A/c XXXX${accountNumber.slice(
    -4
  )} on ${new Date()}. Kindly check your account for more details. \n\n Best regards, \n Bank Fresh`;
  await sendEmail(user.email, subject, text);
};
