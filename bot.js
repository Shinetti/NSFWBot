var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Alustellaas botti
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

// Lasketaan päivien erotus

var calculatedays = function(targetdate, currentdate){
	var oneDay = 24*60*60*1000;

	var diffDays = Math.floor(Math.abs((targetdate.getTime() - currentdate.getTime())/(oneDay)));
	return diffDays
	
};

// Lasketaan aikaero päivän sisällä
var calculatehours = function(days, targetdate, currentdate){
	var oneDay = 24*60*60*1000;
	
	var difference = ((targetdate.getTime() - currentdate.getTime()) - oneDay*days)/1000/60/60;

	var hours = Math.floor(difference);
	difference = (difference - hours)*60;
	
	var minutes = Math.floor(difference);
	difference = (difference - minutes)*60;
	
	var seconds = Math.floor(difference);
	
	return hours + "h " + minutes + "min " + seconds + "s"
	
};

bot.on('message', function (user, userID, channelID, message, evt) {
    // Komento alkaa '!'
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
			
			// !miittiTJ
			// Tää menee rikki sitten kun miitistä on aikaa yli 24 tunteroista!!!!!
			case 'miittiTJ':
			
				var currentdate = new Date();
				//kuukausien indeksointi alkaa nollasta
				var targetdate = new Date(2017, 11, 02);
				targetdate.setHours(0,0,0);
				
				var	days = calculatedays(targetdate, currentdate);
				hours = 12;
				var hours = calculatehours(days, targetdate, currentdate);
				if (days > 0) {
					bot.sendMessage({
						to: channelID,
						message: days + "d " + hours
					});
				}
				else if (hours[0] = '-'){
					bot.sendMessage({
						to: channelID,
						message: "Miitti!!!!!!!!!!!!!!!!!!"
					});
				}
				else {
					bot.sendMessage({
						to: channelID,
						message: hours
					});
				}
			break;
			
			//!help
			//Tulostellaan komennot sitten joskus tulevaisuudessa, 
			//mutta nyt se on vasta rumasti hardcoded
			case 'help':
				
				bot.sendMessage({
						to: channelID,
						message: "Alkuun huutismerkki ja sitten komento: " + '\n' + '\n' +
								 "miittiTJ - tulosteleen sen mitä tältä ny atm halutaan"
					});
			break;
         }
     }
});