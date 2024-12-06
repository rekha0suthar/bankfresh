export const svgToDataUrl = (svg) => {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};
