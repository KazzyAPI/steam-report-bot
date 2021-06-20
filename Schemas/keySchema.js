const mongoose = require('mongoose');


var keySchema = mongoose.Schema({
    key: String,
    balance: Number
});

var keySchema1 = mongoose.model('keySchema', keySchema);

module.exports = keySchema1;