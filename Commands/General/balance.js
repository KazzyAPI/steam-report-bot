

module.exports = {
    name: 'balance',
    aliases: ['bal', 'b'],
    description: "This is a ping command.",
    async execute(client, message, args, Discord) {
        const userSchema = require('../../Schemas/userSchema')

        userSchema.findOne({discordID: message.author.id}, (err,res) => {
            if(res) {
                let embed = new Discord.MessageEmbed()
                .setTitle('Balance Check')
                .setColor('GREEN')
                .setDescription('You currently have ' + res.balance + ' reports available!')
                .setTimestamp()
                message.channel.send(embed)
            } else {
                let embed = new Discord.MessageEmbed()
                .setTitle('Balance Check')
                .setColor('RED')
                .setDescription('You currently dont have any balance :( Try buying some....')
                .setTimestamp()
                message.channel.send(embed)
            }
        })
    }
}