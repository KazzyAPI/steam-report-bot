const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');
bot.commands = new Discord.Collection();
bot.events = new Discord.Collection();
const SteamAPI = require('steamapi');
const steam = new SteamAPI(config.SteamAPI);
const banCheckSchema = require('./Schemas/banCheckSchema.js');
const whitelistSchema = require('./Schemas/whitelistSchema.js');
const statsSchema = require('./Schemas/statsSchema.js');

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(bot, Discord);
})


let mongoose = require('mongoose');

async function connectDatabase() {
    return mongoose.connect(config.mongodb, {useUnifiedTopology: true, useNewUrlParser: true});
}
connectDatabase();
mongoose.connection.on("connected", err => {
    if(err) throw "There has been a error connecting to database! Error found : " + err;
    console.log(dateLog() + "Connection to database has been successful!");
});

//Connecting to db
mongoose.set('useCreateIndex', true);
bot.on('message', async message => {
    
    if(!message.content.startsWith(config.startPrefix) || message.author.bot) return;

  
try{
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLocaleLowerCase();
} catch(error) {
}
})
function dateLog(){
    // function for date log
    return "\x1b[36m" + new Date().toLocaleString() + "\x1b[0m | ";
}
let hour = 3600000 / 2;
let testingtime = 10000;
var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
setInterval(() => {
    console.log(dateLog() + 'Checking bans in db!')
     banCheckSchema.find({}, (err,res) => {
            if(!res.length) return console.log(dateLog() + 'No users in database!')
            for(var i = 0;i < res.length;i++) {
                if(res[i].isBanned == false) {
                    let data = res[i].steamURL;
                        steam.resolve(res[i].steamURL).then(id => {
                            steam.getUserSummary(id).then(summary => {
                            //console.log(id)
                            steam.getUserBans(id).then(bans => {
                                if(bans.communityBanned == true) {
                                    banCheckSchema.findOneAndDelete({steamURL:data}, /*{isBanned: Boolean(true)}*/ (err,res) => {
                                        if(res) {
                                            let embed = new Discord.MessageEmbed()
                                            .setTitle(`${summary.nickname} has been banned!`)
                                            .setThumbnail(summary.avatar.large)
                                            .setColor('GREEN')
                                            .setDescription(`[${id}](${data}) has been community banned!`)
                                            .setTimestamp()
                                            .setFooter(`KazzyDev's Ban checker | Banned at ${dd}/${mm}/${yyyy}`)
                                            bot.channels.cache.get(config.bannedUsersChannel).send(embed);
                                        console.log(dateLog() + `${id} has been banned, removing from db!`);

                                        statsSchema.findOneAndUpdate({reportBot: 'yes'}, {$inc : {bannedUsers: Number(1)}}, (err,res) => {
                                            if(res) {
                                                console.log(dateLog() + 'Incremented banned counter!')
                                            } else {
                                                console.log(dateLog() + 'There seems to be a error:' + err)
                                            }
                                        })
                                        
                                        }
                                    })
                                } else {
                                    console.log(dateLog() + `${id} is still operational!`)
                                }
                                
                    })
                })
            })
        }
    }
})            
},hour);

setInterval(() => {
    //Fetch current watched players

    banCheckSchema.find({}, (err,res) => {
        bot.channels.fetch(config.watchedUsers).then(chan => {

            chan.setName(`Watched : ${res.length}`)
        
        });
   });
whitelistSchema.find({}, (err,res) => {
    bot.channels.fetch(config.whitelistedUsers).then(chan => {

    chan.setName(`Whitelisted : ${res.length}`)

});
})

statsSchema.find({}, (err,res) => {
    bot.channels.fetch(config.bannedUsers).then(chan => {
        chan.setName(`Banned Users : ${res[0].bannedUsers}`)

});

    bot.channels.fetch(config.reportsSent).then(chan => {
        chan.setName(`Reports Sent : ${res[0].sentReports}`)

});


})
   
console.log(dateLog() + 'Channels have been updated!')
}, hour);


bot.login(config.token);
