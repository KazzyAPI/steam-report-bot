

module.exports = {
    name: 'redeem',
    description: "This is a ping command.",
    async execute(client, message, args, Discord) {
        const keySchema = require('../../Schemas/keySchema.js');
        const userSchema = require('../../Schemas/userSchema.js');
            keySchema.findOneAndDelete({key: args[0]}, (err1,res1) => {
                if(!res1) {
                    let embed = new Discord.MessageEmbed()
                    .setTitle('This key doesnt exist!')
                    .setColor('RED')
                    .setDescription('This key does not exist!')
                    .setTimestamp()
                    message.channel.send(embed)
                }
            if(res1) {
                userSchema.findOneAndUpdate({discordID: message.author.id}, {$inc : {balance: Number(res1.balance)}} , (err, res) => {
                    if(res) {
                        let role = message.member.guild.roles.cache.find(role => role.name === "Customer");
                            if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
                                                let embed = new Discord.MessageEmbed()
                        .setTitle('Key Redeemed!')
                        .setColor('GREEN')
                        .setDescription('Your account has been topped up with ' + res1.balance + ' reports!')
                        .setTimestamp()
                        message.channel.send(embed)
                    } else {
                        let role = message.member.guild.roles.cache.find(role => role.name === "Customer");
                            if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
                        let embed = new Discord.MessageEmbed()
                        .setTitle('Key Redeemed!')
                        .setColor('GREEN')
                        .setDescription('Your account has been topped up with ' + res1.balance + ' reports!')
                        .setTimestamp()
                        message.channel.send(embed)

                        newUser = new userSchema({
                            discordID: message.author.id,
                            balance: res1.balance
                        })
                        newUser.save(err => {
                            if(!err) {
                                console.log('User updated!')
                            } else {
                                console.log('There was a error')
                            }
                        })
                    }
                })
                

                
            }
        })
    }
}