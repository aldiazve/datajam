
var globalLib = require("./globalLib")

// constans
const BOG_LAT_LOG = {lat: 4.6097100, lng: -74.0817500};

// map instace
var map;

function initGoogleMap() {
	map = new google.maps.Map(document.getElementById('mapDiv'), {
		center: BOG_LAT_LOG,
		zoom: 11
	});
	console.log("Map loaded");
}

//Exported functions
module.exports.initGoogleMap = initGoogleMap
