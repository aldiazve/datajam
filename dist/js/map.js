// constans
const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const MAPS_KEY = "&key=AIzaSyAwWYDB9v1MopiTtPpUXMDaCwAlOQbtn3c";
const COUNTRY_ISO = "Bogota"
const BOG_LAT_LOG = {lat: 4.6097100, lng: -74.0817500};
// Dependencies
var globalLib = require("./globalLib")
var data = require("./data")
// map instace
var map;
var hotelMarkers = [];
var geocoder;

function initGoogleMap() {
	map = new google.maps.Map(document.getElementById('mapDiv'), {
		center: BOG_LAT_LOG,
		zoom: 11
	});
	geocoder = new google.maps.Geocoder();
	data.initDataSets()
	console.log("Map loaded");

}


function getMarkersFromHotels( hotelsData ){
	var composedURL = ""

	for (var i = 0; i < hotelsData.length; i++) {
		var address = hotelsData[i].direccion + "Bogota";
		geocoder.geocode( { 'address': address  }, function(results, status) {
			console.log(results);
			if (status == google.maps.GeocoderStatus.OK) {
					hotelMarkers[i] = new google.maps.Marker({
					position: results[0].geometry.location,
					map: map
					//title: hotelsData[i].nombre_comercial
				});
			}
		});
	}

	/*
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			hotelMarkers[i] = new google.maps.Marker({
				position: response.results[0].geometry.location,
				map: map
				//title: hotelsData[i].nombre_comercial
			});
			console.log(i);
	*/

}

//Exported functions
module.exports.initGoogleMap = initGoogleMap
module.exports.getMarkersFromHotels = getMarkersFromHotels
