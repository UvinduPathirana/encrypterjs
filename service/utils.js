// Require
const crypto = require("crypto")

function getCipherKey(key) {
    // Security import 
    return crypto.createHash('sha256').update(key).digest();
}

exports.getCipherKey = getCipherKey;