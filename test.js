'use strict';
const crypto = require('crypto');
// npm run dev DO NOT read this file

const parseHexStr2Byte = function(hexStr) {
  if (hexStr.length() < 1) {
    return null;
  } else {
    const result = new Array(hexStr.length() / 2);

    for (let i = 0; i < hexStr.length() / 2; ++i) {
      const high = parseInt(hexStr.substring(i * 2, i * 2 + 1), 16);
      const low = parseInt(hexStr.substring(i * 2 + 1, i * 2 + 2), 16);
      result[i] = (byte)(high * 16 + low);
    }

    return result;
  }
};


const appkey = '9C6437FC14C7CBB76C50F17DD80ADBCF579183F6A7F0E4A1';
const ivraw = '7CBE8A41F4B680F2EF4EAF8F7EE23F7A';


const key = new Buffer(appkey, 'hex').slice(0, 24);
const iv = new Buffer(ivraw, 'hex').slice(0, 8);

console.log('iv',[...iv]);


const plaintext = 'MKdYsq4N9blLGW+T8MyznAWF5uCoJySTSIvOFt4ShmqHqnuczsv0uyOuDcyfY69OIyDnIyJda9+0AmCtu4u9HZ6Hey1qH5sGWPz8lP168sknnOysm/3m/XltLItTlppzxzXOjpSaOLQtG4wi2YI0WuHm/n+LFB2bScpeE+UrwpEaHiXlpUmYZhNXr8zSSLz18YiNe9E0cNrdF47jxb81IV4uPFhQbfAAZNLV1Y5EYV/0sd7IVfMgGbSZ6CDHo6Ez';
const alg = 'des-ede3-cbc';
const autoPad = true;


//decrypt  
const decipher = crypto.createDecipheriv(alg, key, iv);
decipher.setAutoPadding(autoPad);
let txt = decipher.update(plaintext, 'hex', 'utf8');
//txt += decipher.final('utf8');

console.log(txt);