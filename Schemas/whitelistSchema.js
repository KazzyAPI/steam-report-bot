const mongoose = require('mongoose');


var whitelistSchema = mongoose.Schema({
    steamURL: String
});

var whitelistSchema1 = mongoose.model('whitelistSchema', whitelistSchema);

module.exports = whitelistSchema1;