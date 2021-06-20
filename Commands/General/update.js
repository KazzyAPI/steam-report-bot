

module.exports = {
    name: 'update',
    
    description: "This is a ping command.",
    async execute(client, message, args, Discord) {
        const userSchema = require('../../Schemas/userSchema');

        userSchema.findOneAndUpdate({discordID: args[0]}, {workshopBalance: Number(args[1])}, (err,res) => {
            if(err) console.log(err)
            if(res) {
                message.channel.send('yes');
            }
        })
      
        
    }
}