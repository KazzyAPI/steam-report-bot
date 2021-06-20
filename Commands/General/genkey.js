

module.exports = {
    name: 'gen',
    aliases: ['key', 'genkey'],
    description: "This is a ping command.",
    async execute(client, message, args, Discord) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed()
        .setTitle('Error!')
        .setDescription('You do not have ADMINISTRATOR permisions.'))
        let mongoose = require('mongoose');
        const Generator = require("license-key-generator");
        const keySchema = require('../../Schemas/keySchema.js');
        const options = {
            type: "random", // default "random"
            length: 16, // default 16
            group: 4, // default 4
            split: "-", // default "-"
            splitStatus: true // default true
        }
        const code = new Generator(options);
        let text = '';
        let db = '';
        for (var i = 0;i < args[0];i++){
        code.get((error,code)=>{
            if(error) return console.error(error)
            text += `${code}\n`
            db += `${code}`
            keySchema.find({key: db}, (err,res) => {
                if(res) {
                    newKey = new keySchema({
                        key: code,
                        balance: args[1]
                    });
                    
                    newKey.save(err => {
                        if(!err) {
                            console.log('Key saved to db')
                        } else {
                            console.log('There was a error saving the key to db')
                        }
                    })
                    
                }
            })

        })
    }

    

    await new Promise(resolve => setTimeout(resolve, 1000));
    await message.channel.send(text)

        
    }
}