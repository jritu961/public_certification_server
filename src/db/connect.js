const mongoose = require('mongoose');

const connectDB = (url) => {
    return mongoose.connect(url); // here we are returning the promise
};

module.exports = { connectDB };