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
