

module.exports = {
    name: 'check',
    description: "This is a ping command.",
    async execute(client, message, args, Discord) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed()
        .setTitle('Error!')
        .setDescription('You do not have ADMINISTRATOR permisions.'))
        const keySchema = require('../../Schemas/keySchema.js');

        keySchema.findOne({key: args[0]}, (err,res) => {
            if(res) {
                let embed = new Discord.MessageEmbed()
                .setTitle('Key found!')
                .setColor('GREEN')
                .setDescription(`This key was found in the db! It holds a balance of ${res.balance}`)
                .setTimestamp()
                message.channel.send(embed);
            } else {
                let embed = new Discord.MessageEmbed()
                .setTitle('No key found!')
                .setColor('RED')
                .setDescription(`This key was not found in the db! Make sure you copy paste correctly... `)
                .setTimestamp()
                message.channel.send(embed);
            }

        })
    }
}