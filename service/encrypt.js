const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const AppendInitVect = require("./appendInitVect");
const { ALGORITHM, ENCRYPT_EXT, ENCRYPED_EXT } = require('./constants');
const { getCipherKey } = require('./utils');

function encrypt({ file, password }) {
    // Generate pseudo code, random initializer
    const initVect = crypto.randomBytes(16);

    // Generate cipher key
    const CIPHER_KEY = getCipherKey(password)

    const readStream = fs.createReadStream(file);
    const gzip = zlib.createGzip();
    const cipher = crypto.createCipheriv(ALGORITHM, CIPHER_KEY, initVect);
    const appendInitVect = new AppendInitVect(initVect);
    const writeStream = fs.createWriteStream(path.join(file + ENCRYPED_EXT));

    writeStream.on('close', () => {
        console.log('Encryption Success');
    });

    readStream
        .pipe(gzip)
        .pipe(cipher)
        .pipe(appendInitVect)
        .pipe(writeStream);
}

module.exports = encrypt;