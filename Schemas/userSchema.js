const mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    discordID: String,
    balance: Number
});

var userSchema1 = mongoose.model('userSchema', userSchema);

module.exports = userSchema1;