var otro = require("./otro");
var map;

var bogLatLng = {lat: 4.6097100, lng: -74.0817500};

function initGoogleMap() {
	map = new google.maps.Map(document.getElementById('mapDiv'), {
		center: bogLatLng,
		zoom: 11
	});

	console.log("Map loaded");
}

var main = {}

main.initGoogleMap = initGoogleMap

window.main = main

$(document).ready(function(){
      $('.carousel').carousel();
});