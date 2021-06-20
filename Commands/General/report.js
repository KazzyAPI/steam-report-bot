const steamCommunity = require('steamcommunity');
const colors = require('colors');
const dc = require('discord.js');
const path = require("path");
var async = require('async');
var fs = require("fs");
let request = require('request');
var community = new steamCommunity();
var text = fs.readFileSync("./bots.txt").toString('utf-8');
var bot = text.split("\n")
var botall = text.split('\n')
let config = require('../../config.json');
let configRaw = fs.readFileSync("./config.json").toString();
let reportData = require('../../reportData.json');
const { fail } = require('assert');
const SteamAPI = require('steamapi');
const steam = new SteamAPI(config.SteamAPI);
const banCheckUser = require('../../Schemas/banCheckSchema.js');
const userSchema = require('../../Schemas/userSchema.js');
const whitelistSchema = require('../../Schemas/whitelistSchema.js');
const statsSchema = require('../../Schemas/statsSchema.js');
const balance = require('./balance');
const { setInterval } = require('timers');
var RandomQuotes = [
	'I saw him blantantly hacking in csgo comp. Hopefully my report does something',
	'He stole my account please help me get my account back',
	'He took my friends account',
	'This account was bought on g2a',
	'He is cheating and threating me!',
	'He is ddossing me and stealing all of my accounts i need help!',
	'This account was stolen by someone and the owner lost access to the mail and to the account.',
	'Using stolen artworks and not giving credits ( will open a copyright claim)',
	'cheating with hardware cheat ( undetectable )',
	'Using my account without permission my data got leaked and he is using my email and i cant send email to steam to recover',
	'I made this account to report this user because he has stolen my account',
	'This user gives RATs to people and steals all info',
	'He is a well known hacker he said he made a cheat called neverlose?',
	'Cheating in recent games',
	'He is using a RCE exploit putting my account in danger please help',
	'He is threating my friend and i dont know what to do',
	'Using stolen artworks and failing to credit the creators ( will open a copyright claim)',
	'Using stolen art and failing to credit the creators ( will open a copyright claim)',
	'Utilizing taken craftsmanship and neglecting to credit the makers ( will open a copyright guarantee)',
	'This account was purloined by somebody and therefore the owner lost access to the mail and to the account.',
	'I saw him blantantly hacking in csgo comp. Hopefully my report will one thing',
	'He is a standard hacker he aforesaid he created a cheat referred to as neverlose?',
	'Using my account while not permission my information got leaked and hes victimization my email and that i cant send email to steam to recover',
	'Using my account without consent, my details was leaked, and he is victimising my email, which I am unable to rebound from and I am unable to send an email to Steam.',
	'I created this account in order to expose this user because he robbed my account.',
	'Attempting phishing scam on FACEIT',
	'Selling steam accounts on auctionsite',
	'Bought this account from (g2a)',
	'Bought this account from (accountautions)',
	'Bought this account from csgoaccounts, and very cheap',
	'Stole from my friend! I need this account back',
	'Bought this account from (g2a)',
	'Steam accounts are being auctioned off on a website.',
	'Auctioning off Steam accounts',
	'On FACEIT, He attempted a phishing scam.',
	'FACEIT phishing attempt',
	'He purchased this account from (g2a)',
];

var hijacking = [
	`He Stole my account and i need help recovering this.`,
	`This guy stole my account via a phishing link and when I told him I was going to get it back he threatened to dox me with the last login from my computer. Please help me get my account back.`,
	`He has stolen my account by getting me to log into a fake website and transfered my skins. This could be a alt account but its him!`,
	`Hello, this user has been sending me phishing links trying to steal skins or even my account from me. Please do something before he gets someone else`,
	`My friend send my login dates to this guy and he stole my account`,
	`stolen account`,
	`Hello this user got hacked by a software can you delete that account or give it to me back? it doining illegal stuff and more with my account`,
	`This was my buddy's account and he was sent a faulty trade link, hacked, and hes trying to take the skins. Please pause the trades so he cant give his skins away. Thanks`,
	`This account is my main, I'm making this report from another account so I can get it locked, please lock it asap before my skins get stolen.`,
	`Please help me! This is my account and i was phished for the login details, please lock it so i can get it back urgently.`,
	`Dear Steam Support, I hope this message gets to you soon because I was just phished into clicking a fake steam login link to trade some guy and now I cant log in. please lock my account so I can keep my account.`,
	`Hello Steam Support, This Guy dm'd me a while ago and tried to fish me or something now he is doing the same with my friend.`,
	`Impersonating`,
	`Scammer`,
	`Grabbing ips`,
	`Hi steam im contacting you for the reason that this account is stolen from my friend he has contacted me to report this account because he cant access his account he is very worried atm and hope this gets to you urgently`,
	`Hello dear steam support, my friend recently lost his account for a hacker. He asked me to report the account so the hacker can't steal his favourites skins, can you guys please block the account? Thanks!`,
	`hello this account was phised from a fake login site could you please lock it before he trades my  skins away :(`,
]

const perChunk = 5;
const betweenChunks = 10000;

module.exports = {
    name: 'report',
    aliases: ['r', 'repo'],
    description: "Reports given users",
    async execute (client, message, args, Discord) {

if(args[0] == 'stop') {
if(ongoingProcess[message.author.id] == "running"){
	ongoingProcess[message.author.id] = "stopped";
	const embedMessage = new Discord.MessageEmbed()
	.setColor("GREEN")
	.setTitle('Process Stopped')
	.setDescription(':rocket: Please allow some time for the rest of the follows to be sent!')
	
	message.channel.send(embedMessage);
}else{
	const embedMessage = new Discord.MessageEmbed()
	.setColor("RED")
	.setTitle('No Process In Progress')
	.setDescription(":x: There is no process running at the moment already.\nIf you're not able to start process, wait some minutes for previous process to finish.")
	message.channel.send(embedMessage);
}
}

let proxydata = fs.readFileSync('./proxies.txt', 'utf8');
let proxies = proxydata.split("\n");
proxies = proxies.filter(veri=> veri.length > 0 && veri != "" && veri != " ")
author = message.author.id;

	userSchema.findOne({discordID: message.author.id}, async (err,res) => {
		whitelistSchema.findOne({steamURL: args[0]}, async (err1,res1) => {
		
		if(res) {
			if(res.balance < 0) {
				let embed = new Discord.MessageEmbed()
				.setTitle('Seems you dont have enough reports.')
				.setColor('RED')
				.setDescription(`You requested to report a profile but dont have sufficent funds! Current balance : ${res.balance}`)
				.setTimestamp()
				message.channel.send(embed)
				return;
			} else if(res1) {
				let embed = new Discord.MessageEmbed()
				.setTitle('You cannot report a whitelisted user')
				.setColor('RED')
				.setDescription(`You cannot report this user using my service. Want a whitelist? Contact admin for prices!`)
				.setTimestamp()
				message.channel.send(embed)
				return;				
			} else {

					let config = null;
					let ongoingProcess = {};



					let id = '';

					steam.resolve(args[0]).then(async ids  => {
						let user =ids;
						id = ids;
						console.log('%s is steamID'.gray, user);
						await new Promise(r => setTimeout(r, 6000));
					banCheckUser.findOneAndUpdate({steamURL: args[0]}, {isBanned: Boolean(false)}, (err,res) => {

						if(res) {
							console.log('User already being checked!')
						} else {
							newBan = new banCheckUser({
								steamURL: args[0],
								isBanned: false
							})
							
					
							newBan.save(err => {
								if(!err) {
									console.log('Added')
								} else {
									console.log('err')
								}
							})
						}
						
					
					})
			
		
		let sentEmbed = new Discord.MessageEmbed()
		.setTitle('Reports are being sent!')
		.setDescription('Please wait will we send reports to this user!')
		.setColor('GREEN')
		.setTimestamp()
		message.channel.send(sentEmbed);
		(async() => {
			// Getting chunks:
			let subbot = []; 
			let bot = [];
			ongoingProcess[message.author.id] = "running";
		
			if(reportData[user] && reportData[user].length > 0){
				let added = 0;
			  
				for(let sayi = 0; sayi < botall.length; sayi++){
					if(!reportData[user].includes(botall[sayi].split(":")[0]) && added < 20){
						bot.push(botall[sayi]);
						added++;
					}              
				}
		
			}else{
				for(let sayi = 0; sayi < 20; sayi++){
					bot.push(botall[sayi]);
				}
			}
		 
		 
		
			for (let i = 0; i <Math.ceil(bot.length/perChunk); i++){
				
				
				subbot[i] = bot.slice((i*perChunk), (i*perChunk) + perChunk);
				
			}
			
		   
			let proxyi = 0;
			console.log('Total %s accounts and %s chunks'.cyan, bot.length, subbot.length);
			console.log(`Sending to steamid : ${user}`);
		
			let successReport = 0;
			let failedReports = 0;

			for (let ii = 0; ii < subbot.length; ii++) {
				
				
				var successChunk = 0;
				var failedChunk = 0;	
				
				async.each(subbot[ii], function(item, callback){
		
					if(ongoingProcess[message.author.id] == "running"){
						 
								const logOnOptions = {	accountName: item.split(":")[0], password: item.split(":")[1] };  
								
								if(reportData[user] && !reportData[user].includes(logOnOptions.accountName) || !reportData[user]){
									
									if(!proxies[proxyi]){
										proxyi = 0;
									}
									var proxyUrl = `http://${proxies[proxyi]}`;
									var proxifiedRequest = request.defaults({'proxy': proxyUrl});
									var community = new steamCommunity({request: proxifiedRequest});
					
									community.login({
											"accountName": logOnOptions.accountName,
											"password": logOnOptions.password
									},
									function (err, sessionID, cookies, steamguard, oAuthToken) {
										if (err) { 
											
											console.log(`[%s] Unable to auth with ${logOnOptions.accountName}`.red,); callback(); failedChunk++; failedReports++;failedReports++;
											failedReports++;
											if(!reportData[user]){
												reportData[user] = [];
												reportData[user].push(logOnOptions.accountName);
												fs.writeFileSync('../../reportData.json', JSON.stringify(reportData));
											}else{
												if(Array.isArray(reportData[user])){
													reportData[user].push(logOnOptions.accountName);
													fs.writeFileSync('../../reportData.json', JSON.stringify(reportData));
												}else{
													delete reportData[user];
													reportData[user] = [];
													reportData[user].push(logOnOptions.accountName);
													fs.writeFileSync('../../reportData.json', JSON.stringify(reportData));
		
												}
											}
										}
										if (!err) {	
											console.log(`[%s] Using proxy: ${proxies[proxyi]}`.yellow);													
											console.log('[%s] Successfully logged on (Session ID: %s)'.yellow, logOnOptions.accountName, sessionID);
											
											var randomNumber = Math.floor(Math.random()*hijacking.length);
										
											console.log(hijacking[randomNumber])
											var options = {
													formData: {	sessionid: sessionID, json: 1, abuseID: user, eAbuseType: 14, abuseDescription: hijacking[randomNumber], ingameAppID: ''},
													headers: { Cookie: cookies, Host: 'steamcommunity.com', Origin: 'https://steamcommunity.com' },
													json: true
											};
					
												community.httpRequestPost(
													'https://steamcommunity.com/actions/ReportAbuse/', options,
													function (err, res, data) {
														
														if (err) {
															console.log('[%s] Report request failed'.red, logOnOptions.accountName, err); failedChunk++;failedReports++;
															failedReports++;
															callback()
														}
														if (!err) {
															if (data == 1) { 
																
																if(!reportData[user]){
																	reportData[user] = [];
																	reportData[user].push(logOnOptions.accountName);
																	fs.writeFileSync('../../reportData.json', JSON.stringify(reportData));
																}else{
																	if(Array.isArray(reportData[user])){
																		reportData[user].push(logOnOptions.accountName);
																		fs.writeFileSync('../../reportData.json', JSON.stringify(reportData));
																	}else{
																		delete reportData[user];
																		reportData[user] = [];
																		reportData[user].push(logOnOptions.accountName);
																		fs.writeFileSync('../../reportData.json', JSON.stringify(reportData));
							
																	}
																}
																
																	
																   
											
		
																console.log('[%s] Report request successfuly sent with response: %s'.green, logOnOptions.accountName, data); successChunk++;successReport++;
																
															}
															else if (data == 25) { 
															
																if(!reportData[user]){
																	reportData[user] = [];
																	reportData[user].push(logOnOptions.accountName);
																	fs.writeFileSync('../../reportData.json', JSON.stringify(reportData));
																}else{
																	if(Array.isArray(reportData[user])){
																		reportData[user].push(logOnOptions.accountName);
																		fs.writeFileSync('../../reportData.json', JSON.stringify(reportData));
																	}else{
																		delete reportData[user];
																		reportData[user] = [];
																		reportData[user].push(logOnOptions.accountName);
																		fs.writeFileSync('../../reportData.json', JSON.stringify(reportData));
							
																	}
																}
																console.log('[%s] Report request already sent from this account! %s'.yellow, logOnOptions.accountName, data); successChunk++; 
																
															}										
															else {
															 
																 console.log('[%s] Unexpected Error occured: %s'.red, logOnOptions.accountName, data);failedChunk++; failedReports++;
															if(!reportData[user]){
																reportData[user] = [];
																reportData[user].push(logOnOptions.accountName);
																fs.writeFileSync('../../reportData.json', JSON.stringify(reportData));
															}else{
																if(Array.isArray(reportData[user])){
																	reportData[user].push(logOnOptions.accountName);
																	fs.writeFileSync('../../reportData.json', JSON.stringify(reportData));
																}else{
																	delete reportData[user];
																	reportData[user] = [];
																	reportData[user].push(logOnOptions.accountName);
																	fs.writeFileSync('../../reportData.json', JSON.stringify(reportData));
						
																}
															}
															
															
															}
															callback()
														}	
																			
													},
													"steamcommunity"
												);	
													
												
													 
										}
		
										proxyi++;    
									});
									
								}else{
									console.log('[%s] This user has been reported before.'.red); 
									callback(); 
									failedChunk++; failed++; 
								}		
					}else{
						
						callback(); 
						failedChunk++; failed++; 
						ii = subbot.length;
					}
					
					   
				}, function(err) {
		
						console.log('Chunk %s finished: Successfully sent %s reports and %s failed requests'.white, ii + 1, successChunk, failedChunk);
					   
							
						
						
				});
			   
				if (ii < subbot.length) await new Promise(r => setTimeout(r, betweenChunks));
			};
			
			console.log('Successfully reported %s times and %s failed requests.'.black.bgWhite, successReport, failedReports)
			await new Promise(r => setTimeout(r, 6000));
			statsSchema.findOneAndUpdate({reportBot: 'yes'}, {$inc : {sentReports: Number(successReport)}}, (err,res) => {
				console.log('Updated sent reports to include recent data. You')
			})
			userSchema.findOneAndUpdate({discordID: message.author.id}, {$inc: {balance: Number(-1)}}, (err,res) => {
				if(res) {
					console.log('Balance updated!')
				} else {
					console.log('err' + err)
				}
			})
			
		
		})();
						
					})
				
			}
		}
	})
		
})
	
}
        
    }
    
