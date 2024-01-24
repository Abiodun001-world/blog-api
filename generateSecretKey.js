const crypto = require('crypto');

function generateRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') // convert to hexadecimal format
    .slice(0, length); // return required number of characters
}

const jwtSecret = generateRandomString(32); // Change 32 to the desired length of your JWT secret

console.log(`Generated JWT Secret: ${jwtSecret}`);
