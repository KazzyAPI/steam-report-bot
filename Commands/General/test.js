

module.exports = {
    name: 'getwatched',
    
    description: "This is a ping command.",
    async execute(client, message, args, Discord) {
        const trackedUsers = require('../../Schemas/banCheckSchema.js');     
        const fs = require('fs')
        let tracked = '';
        trackedUsers.find({}, (err,res) => {
            for (var i = 0;i < 25;i++) {
                tracked += `${i + 1} - <${res[i].steamURL}>\n`;
            }
        })
        await new Promise(resolve => setTimeout(resolve, 1000));
        message.channel.send(tracked);
        
    }
}