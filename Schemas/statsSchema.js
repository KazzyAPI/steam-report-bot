const mongoose = require('mongoose');


var statsSchema = mongoose.Schema({
    reportBot: String,
    bannedUsers: Number,
    sentReports: Number
});

var statsSchema1 = mongoose.model('statsSchema', statsSchema);

module.exports = statsSchema1;