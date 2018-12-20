const crypto = require('crypto');

const TIMESTAMP = parseInt(Date.now() / 1000, 10);

function createHash(ts, privateKey, publicKey) {
  const hashString = ts + privateKey + publicKey;
  return crypto
    .createHash('md5')
    .update(hashString)
    .digest('hex');
}

function getHash() {
  return createHash(TIMESTAMP, process.env.PRIVATE_KEY, process.env.PUBLIC_KEY);
}

module.exports = {
  TIMESTAMP,
  getHash
};
