export const isValidObjectId = (value: any): boolean => {
  if (typeof value !== 'string') return false;
  if (value.length !== 24) return false;

  // must be hex characters only
  return /^[a-fA-F0-9]{24}$/.test(value);
};
