module.exports = {
	
	calculate: function(){
		var currentdate = new Date();
		currentdate.setHours(currentdate.getHours()+1);
		//kuukausien indeksointi alkaa nollasta
		var targetdate = new Date(2017, 11, 02);
		targetdate.setHours(0,0,0);
		
		var	days = calculatedays(targetdate, currentdate);
		hours = 12;
		var hours = calculatehours(days, targetdate, currentdate);
		
		return [days, hours]
	}
}

	
var calculatedays = function(targetdate, currentdate){
	var oneDay = 24*60*60*1000
	var diffDays = Math.floor((targetdate.getTime() - currentdate.getTime())/(oneDay));
	return diffDays

}

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
	
}