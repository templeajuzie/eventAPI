import crypto from 'crypto';

const generateKey = crypto.randomBytes(64).toString('hex');
console.log('Generated Secret Key:', generateKey);