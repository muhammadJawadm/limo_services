export const validatePassword = (password) => {
  if (!password || !password.trim()) {
    return 'Password is required.';
  }

  if (password.includes(' ')) {
    return 'Password cannot contain spaces.';
  }

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+^()[\]{}|\\:;"'<>,./~`_-]).{8,}$/;

  if (!strongPasswordRegex.test(password)) {
    return 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.';
  }

  return null;
};