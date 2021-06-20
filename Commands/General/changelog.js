

module.exports = {
    name: 'changelog',
    description: "This is a ping command.",
    async execute(client, message, args, Discord) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed()
        .setTitle('Error!')
        .setDescription('You do not have ADMINISTRATOR permisions.'))
        const bot = new Discord.Client();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        let poop = args.toString();
        let change = poop.split('\n');
        let full = '';
        change.forEach((element, index) => {
            full+= `${index + 1} - ${change[index]}\n`
        });
        let embed = new Discord.MessageEmbed()
        .setTitle(`Changelog [${dd}/${mm}/${yyyy}]`)
        .setThumbnail('https://p7x7q5i4.rocketcdn.me/en/wp-content/uploads/sites/2/2019/06/change-log.jpg')
        .setColor('GREEN')
        .setDescription(full.replace(/,/g, ' ') + '-------------------------------------\n End of devlog')
        .setFooter('Developer log | by ' + message.author.tag)
        message.guild.channels.cache.get('841154745308676096').send(embed)
        // message.channel.send(embed);
        
    }
}