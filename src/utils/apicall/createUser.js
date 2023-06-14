export const createUser = async (email, password, passwordConfirm) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, passwordConfirm }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const { error } = data;

    let errorMsg;

    // Operational errors
    switch (error) {
      case error === 'User validation failed: passwordConfirm: Passwords are not the same!':
        errorMsg = 'Passwords are not the same!';
        break;
      case error.code === 11000: // not working #bug
        errorMsg = 'Email has taken already please choose another one.';
        break;
      default:
        errorMsg = 'Something went wrong!';
    }

    if (error.code === 11000) {
      errorMsg = 'Email has taken already please choose another one.';
    }

    throw new Error(errorMsg);
  }

  return data;
};
