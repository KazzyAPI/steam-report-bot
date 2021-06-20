# Steam Report Bot

After a long loved journey it's time i let the community continue the project i enjoyed making. All i ask of you is if you guys decide to use this leave credits to me, or better yet leave me a star on here so i know you appreciate my work.

## What this bot includes
- [x] Built in ban checker.
- [x] Built in proxy support
- [x] Bot account tracker, could be optimized tbh.
- [x] Administration handling
- [x] Awesome command handler to make it easy to build a aio bot possibly?
- [x] Key system with redeem so no need to worry about using shitty third-party bots
- [x] Few more things probs good idk?
## Installation

Node is required to run this...

```js
npm install | npm i
```

## Setting up

```json
{
    "token" : "DICORD TOKEN HERE"
,   "startPrefix" : "YOUR PREFIX HERE"
,   "SteamAPI" : "API KEY HERE"
,   "mongodb" : "MONGODB URL HERE"
,   "bannedUsersChannel" : "CHANNEL TO SEND BANNED USERS TO"
,   "watchedUsers" : "VOICE CHANNEL FOR TRACKING WATCHED USERS"
,   "bannedUsers" : "VOICE CHANNEL FOR TRACKING BANNED USERS"
,   "reportsSent" : "VOICE CHANNEL FOR TRACKING REPORTS"
}
```

You must enter each and every detail correctly or else bot will fail to function. [ Create a named Customer ]
- Token
    - This is pretty straight forward its just the discord bot!
- startPrefix
    - At the beginning I wanted to add custom prefix but realized it was a waste.
- SteamAPI
    - This can be found here : https://www.steamcommunity.com/dev
- mongodb
    - This will be the connection string used to interact with the report bot. This *MUST* be included or else the bot will fail to run entirely.
- bannedUsersChannel
    - The channel used for sending your victims. Will say `User is banned!`. The standard notification :P
- watchedUsers / bannedUsers / reportsSent
    - Just a neat little thing i made for my server. Will track this information in voice channels, just like seen with zonerbot.

## Moving foward
  Now that this is done we have a few more things needed to get running. Bots will need to be placed within the `bots.txt` file in the format of `user:pass`. Proxies are also needed and will be done in the format `user:pass@ip:port`. I highly recommend using private proxies just for the quality and longevity of the accounts.

Once done your bots file should look something like the follow : 
```
user1:pass1
user2:pass2
user3:pass3
user4:pass4
user5:pass5
user6:pass6
```

And proxies.txt should look like : 

```
bob:qwer@127.0.0.1:1337
bob:qwer@127.0.0.1:1337
bob:qwer@127.0.0.1:1337
```

## Support my work <3
If you enjoy appreciate my work and would like to see more from me please consider donating as it means alot and motivates me to doing more things like this!
BTC : 39yFPXNZQMPR9ec1cjjzJLMbv4zAJQNNMB
My Discord : KazzyDev#7653


## License
[MIT](https://choosealicense.com/licenses/mit/)
