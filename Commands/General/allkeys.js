

module.exports = {
    name: 'checkall',
    description: "This is a ping command.",
    async execute(client, message, args, Discord) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed()
        .setTitle('Error!')
        .setDescription('You do not have ADMINISTRATOR permisions.'))
        const keySchema = require('../../Schemas/keySchema');
        const mongoose = require('mongoose');
        let test = '';
        keySchema.find({}, (err,res) => {
            for(var i = 0;i < res.length;i++) {
                test+=`${res[i].key} | Reports : ${res[i].balance}\n`
            }

            
            
        })
        
        await new Promise(resolve => setTimeout(resolve, 1000));
            message.channel.send(test)
    }
}