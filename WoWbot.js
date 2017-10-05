var auth = require('./auth.json');
var auth = require('./bot.js');

var bnet = require('battlenet-api')(auth.WoWtoken);

// bnet.wow.character.profile({
	// origin: 'eu',
	// realm: 'Stormreaver',
	// name: 'Aketus'
// })
