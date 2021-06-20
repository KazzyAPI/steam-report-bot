

module.exports = {
    name: 'watch',
    description: "This is a ping command.",
    async execute(client, message, args, Discord) {
        const banCheckSchema = require('../../Schemas/banCheckSchema.js')

        banCheckSchema.findOne({steamURL: args[0]}, (err,res) => {
            if(res) {
                let embed = new Discord.MessageEmbed()
                        .setTitle('This user is already being watched!')
                        .setColor('GREEN')
                        .setDescription('You will be notified in the banned-users channel if this user gets community banned!')
                        .setTimestamp()
                        message.channel.send(embed)
            }
            if(!res) {
                newKey = new banCheckSchema({
                    steamURL: args[0],
                    isBanned: false
                });
                
                newKey.save(err => {
                    if(!err) {
                        console.log('USer is now being watched!')
                        let embed = new Discord.MessageEmbed()
                        .setTitle('This user is now being watched!')
                        .setColor('GREEN')
                        .setDescription('You will be notified in the banned-users channel if this user gets community banned!')
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