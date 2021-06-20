const mongoose = require('mongoose');


var banSchema = mongoose.Schema({
    steamURL: String,
    isBanned: Boolean
    
});

var banSchema1 = mongoose.model('banSchema', banSchema);

module.exports = banSchema1;