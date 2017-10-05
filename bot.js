var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

//Tää katoo sitten aikanaan tonne WoWbot.js
var bnet = require('battlenet-api')(auth.WoWtoken);

//Tähän tungetaan uudet hienot ominaisuudet
var miittiTJ = require('./miittiTJ.js')
var WoWbot = require('./WoWbot.js')

// Loggerille conffaukset
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Init bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});


bot.on('message', function (user, userID, channelID, message, evt) {
    // Komento alkaa '!'
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
    
        args = args.splice(1);
        switch(cmd) {
			
			// !miittiTJ
			case 'miittiTJ':
				if (args.length == 0){
					//timeleft[0] = days left until miitti
					//timeleft[1] = time left in format "24h 34min 43s"
					var timeleft = miittiTJ.calculate();
					
					if (timeleft[0] > 0) {
						bot.sendMessage({
							to: channelID,
							message: timeleft[0] + "d " + timeleft[1]
						});
					}
					//tarkastellaan että aika tai vuorokausi on pyörähtäny ympäri
					else if (timeleft[1][0] == '-' || timeleft[0][0] == '-'){
						bot.sendMessage({
							to: channelID,
							message: "Miitti!!!!!!!!!!!!!!!!!!"
						});
					}
					//jos ollaan yhden vuorokauden sisällä tulostellaan pelkät tunnit
					else {
						bot.sendMessage({
							to: channelID,
							message: timeleft[1]
						});
					}
				}			
			break;
			
			case 'ilvl':
				//nää pitää siirtää tonne WoWbot.js
				
				//!ilvl <character name>
				if (args.length == 1){
					
					bnet.wow.character.items({
						origin: 'eu',
						realm: 'Stormreaver',
						name: args[0]
					}, function(err, body, res){
						if (res.statusCode == 200){
							bot.sendMessage({
								to: channelID,
								message: body.name + " - " + 
								body.items.averageItemLevelEquipped
							});
						}
					});
				}

				//!ilvl <character name> <realm name>
				else if (args.length == 2){
					bnet.wow.character.items({
						origin: 'eu',
						realm: args[1],
						name: args[0]
					}, function(err, body, res){
						if (res.statusCode == 200){
							bot.sendMessage({
								to: channelID,
								message: body.name + " - " + 
								body.items.averageItemLevelEquipped
							});
						}
					});
				}	
			break;
			
			//!help
			//Tulostellaan komennot sitten joskus tulevaisuudessa, 
			//mutta nyt se on vasta rumasti hardcoded
			
			case 'help':
			case 'apuva':
			case 'olenkahdeksanjamitätämäon':
				if (args.length == 0){
					
					bot.sendMessage({
							to: channelID,
							message: "Tässä nää ny olis: " + '\n' + '\n' +
									 "!miittiTJ - tulosteleen sen mitä tältä ny atm halutaan" + '\n' + 
									 "!ilvl <char name> - tulostaa Stormeaverilta kyseisen ukkelin" + '\n' +
									 "!ilvl <char name> <realm> - tulostaa hahmon halutulta realmilta" + '\n'
						});
				}
			break;
         }
     }
});