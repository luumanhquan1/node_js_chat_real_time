const jwt = require('jsonwebtoken');
 const dotenv = require('dotenv');
dotenv.config();
exports.encode = function (data) {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
}
exports.decode = function (data) {
    return jwt.verify(data, process.env.ACCESS_TOKEN_SECRET);
}