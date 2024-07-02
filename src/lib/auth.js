import jwt from 'jsonwebtoken';

// lagay ko muna here, pero tatago ko to sa .env file
const secretKey = 'Qh9pZG5y3pVfbH8QJnNjXVW3j8Iy3kPztT6xO1+9';
const expiresIn = '1h';

export function generateToken(user) {
  return jwt.sign(user, secretKey, { expiresIn });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
