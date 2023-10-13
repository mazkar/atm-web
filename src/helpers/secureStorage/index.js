import CryptoJS from 'crypto-js';
import SecureStorage from 'secure-web-storage';

// const securestorage_secret_key = ENV.SECURESTORAGE_SECRET_KEY;
const securestorage_secret_key = process.env.REACT_APP_SECURESTORAGE_SECRET_KEY;

const secureStorage = new SecureStorage(sessionStorage, {
  hash: function hash(key) {
    key = CryptoJS.SHA256(key, securestorage_secret_key);

    return key.toString();
  },
  encrypt: function encrypt(data) {
    try {
      data = CryptoJS.AES.encrypt(data, securestorage_secret_key);
      data = data.toString();
      return data;
    } catch (err) {
      console.log(err);
      return;
    }
  },
  decrypt: function decrypt(data) {
    try {
      data = CryptoJS.AES.decrypt(data, securestorage_secret_key);
      data = data.toString(CryptoJS.enc.Utf8);
      return data;
    } catch (err) {
      console.log(err);
      return;
    }
  },
});

export default secureStorage;
