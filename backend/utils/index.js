export const generateAccountNumber = () => {
  return `123${Math.floor(10000 + Math.random() * 90000)}`;
};

export const generateCustomerId = () => {
  return `CUST${Math.floor(100000 + Math.random() * 900000)}`;
};

export const generateDebitCardDetails = () => {
  const cardNumber = `5${Math.floor(
    100000000000000 + Math.random() * 900000000000000
  )}`;
  const cvv = Math.floor(100 + Math.random() * 900);
  return { cardNumber, cvv };
};
