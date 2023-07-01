export const isValidPhone = (number) => {
  const phoneRegex = /^[-+,0-9]{10,20}$/;
  return phoneRegex.test(number);
};
