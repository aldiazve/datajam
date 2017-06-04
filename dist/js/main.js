//dependencies
var mapLib = require("./map");

function initGoogleMap() {
	mapLib.initGoogleMap();
}

function showStatistics(){
	
}

var main = {}

main.initGoogleMap = initGoogleMap
main.showStatistics = showStatistics

window.main = main

$(document).ready(function(){
      $('.carousel').carousel();
		$('#restaurants').change( mapLib.filter.filterResta);
		$('#museums').change(mapLib.filter.filterMuse);
		$('#libraries').change( mapLib.filter.filterLib);
		$('#culture_center').change( mapLib.filter.filterCul);
		$('#theatres').change( mapLib.filter.filterThe);
		$('#statistics1').on('click', main.showStatistics);
});
