var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");
var ConfigurationService = require('../services/ConfigurationService.js');
//
//Load Key
var key256Bits = CryptoJS.PBKDF2(ConfigurationService.GetSecret(), ConfigurationService.GetSalt(), {
    keySize: 256 / 32,
    iterations: 1000
});
var PasswordValidationHash = ConfigurationService.GetPasswordValidationHash();

exports.EncryptObject = function(object) {
    return CryptoJS.AES.encrypt(JSON.stringify(object), key256Bits.toString()).toString();
};

exports.DecryptObject = function(ciphertext) {
    var bytes = CryptoJS.AES.decrypt(ciphertext, key256Bits.toString());
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

exports.ValidatePassword = function(password) {
    var PasswordHash = SHA256(password).toString();
    return PasswordHash == PasswordValidationHash;
};