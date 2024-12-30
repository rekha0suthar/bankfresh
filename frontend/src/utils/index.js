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

export const formatDate = (date) => {
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

export const getFilters = (type, time, startDate, endDate) => {
  // Get current date
  const currentDate = new Date();
  // Prepare filter parameters
  const filters = {
    transactionType:
      type === 'all'
        ? 'Credit, Debit'
        : type === 'credit-only'
        ? 'Credit'
        : 'Debit',
    startDate: undefined,
    endDate: undefined,
  };

  // Determine startDate and endDate based on the time parameter
  if (time === 'current-month') {
    filters.startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    filters.endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
  } else if (time === 'previous-month') {
    filters.startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    filters.endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
  } else if (time === 'date-range') {
    filters.startDate = new Date(startDate); // Assuming startDate is already in the correct format
    filters.endDate = new Date(endDate); // Assuming endDate is already in the correct format
  }

  return filters;
};

export const formatISOTime = () => {
  const weekDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  const date = new Date();
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const weekDay = weekDays[date.getDay()];
  // Determine AM or PM
  const ampm = hours >= 12 ? 'PM' : 'AM';

  return `ISO ${weekDay} ${day} ${month} ${year} ${hours}:${minutes}:${seconds} ${ampm}`;
};
