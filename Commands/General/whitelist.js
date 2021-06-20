

module.exports = {
    name: 'whitelist',
    description: "This is a ping command.",
    async execute(client, message, args, Discord) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed()
        .setTitle('Error!')
        .setDescription('You do not have ADMINISTRATOR permisions.'))

        const whitelistSchema = require('../../Schemas/whitelistSchema.js')

        whitelistSchema.find({steamURL: args[0]}, (err,res) => {
            if(res) {
                newKey = new whitelistSchema({
                    steamURL: args[0]
                });
                
                newKey.save(err => {
                    if(!err) {
                        console.log('User has been whitelisted')
                        let embed = new Discord.MessageEmbed()
                        .setTitle('This user is now whitelisted!')
                        .setColor('GREEN')
                        .setDescription('What does this mean for you? It will restrict people from reporting this user. Simply cannot be reported with my service.')
                        .setTimestamp()
                        message.channel.send(embed)
                    } else {
                        console.log(err)
                        let embed = new Discord.MessageEmbed()
                        .setTitle('Error')
                        .setColor('RED')
                        .setDescription('Please see console for more details!')
                        .setTimestamp()
                        message.channel.send(embed)
                    }
                })
                
            }
        })
    }
}