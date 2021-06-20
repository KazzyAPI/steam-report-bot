

module.exports = {
    name: 'help',
    aliases: ['h', 'hlp'],
    description: "This is a ping command.",
    async execute(client, message, args, Discord) {
        let embed = new Discord.MessageEmbed()
        .setTitle('Help Menu!')
        .setColor('GREEN')
        .addFields(
            {name: 'report', value: 'Usage: report <user> <amount>', inline:true},
            {name: 'report stop', value: 'Stops reporting user.', inline:true},
            {name: 'balance', value: 'Checks how many reports you can use!', inline:true},
            {name: 'redeem', value: 'Usage: redeem <key>', inline:true},
            {name: 'watch', value: 'Usage: watch <steamurl> | Keeps track of user and if banned gives notification.', inline:true},
            {name: 'whitelist', value: 'Usage: whitelist <steamurl> | Prevents users from reporting this user.', inline:true},
            {name: 'prices', value: 'Checks the prices for current services!<not set>', inline:true},
        )
        .setFooter(`KazzyDev's Report Bot`)
        .setTimestamp()
        message.channel.send(embed);
    }
}