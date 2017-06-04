//dependencies
var mapLib = require("./map");

function initGoogleMap() {
	mapLib.initGoogleMap();
}

var main = {}

main.initGoogleMap = initGoogleMap

window.main = main

$(document).ready(function(){
      $('.carousel').carousel();
			$('#restaurants').change( mapLib.filter.filterResta);
			$('#museums').change(mapLib.filter.filterMuse);
			$('#libraries').change( mapLib.filter.filterLib);
			$('#culture_center').change( mapLib.filter.filterCul);
			$('#theatres').change( mapLib.filter.filterThe);
});
