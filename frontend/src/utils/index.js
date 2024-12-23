export const svgToDataUrl = (svg) => {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

export const validMobileNumber = (mobileNumber) => {
  return mobileNumber.length === 10;
};

export const validAadharNumber = (aadharNumber) => {
  return aadharNumber.length === 12;
};

export const validityCheck = (email, mobileNumber, aadharNumber) => {
  return (
    isValidEmail(email) &&
    validAadharNumber(aadharNumber) &&
    validMobileNumber(mobileNumber)
  );
};

export const formatCardNumber = (cardNumber) => {
  // Remove any non-digit characters
  const cleaned = cardNumber?.replace(/\D/g, '');

  // Split the cleaned number into groups of 4 digits
  const formatted = cleaned?.match(/.{1,4}/g);

  // Join the groups with a space
  return formatted ? formatted.join(' ') : '';
};

export const formatDate = (date) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const day = new Date(date).getDate();
  const month = months[new Date(date).getMonth()];
  const year = new Date().getFullYear();

  return `${day} ${month} ${year}`;
};

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};
