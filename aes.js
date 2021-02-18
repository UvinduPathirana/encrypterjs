const decrypt = require('./service/decrypt');
const encrypt = require('./service/encrypt')

const [mode, file, password] = process.argv.slice(2);
const shouldEncrypt = mode === 'encrypt';
const shouldDecrypt = mode === 'decrypt';

if(shouldEncrypt) {
    encrypt({ file, password });
}

if (shouldDecrypt) {
    decrypt({ file, password })
    console.log({ file });
}