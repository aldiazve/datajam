// constans
const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const MAPS_KEY = "&key=AIzaSyAwWYDB9v1MopiTtPpUXMDaCwAlOQbtn3c";
const COUNTRY_ISO = ",Bogota"
const BOG_LAT_LOG = {lat: 4.6097100, lng: -74.0817500};
// Dependencies
var globalLib = require("./globalLib")
var data = require("./data")
// map instace
var map;
var hotelMarkers = [];

function initGoogleMap() {
	map = new google.maps.Map(document.getElementById('mapDiv'), {
		center: BOG_LAT_LOG,
		zoom: 11
	});
	data.initDataSets()
	console.log("Map loaded");
}

function getMarkersFromHotels( hotelsData ){
	var composedURL = ""

	for (var i = 0; i < hotelsData.length; i++) {
		composedURL = GEOCODE_URL + hotelsData[i].direccion + COUNTRY_ISO + MAPS_KEY
		getLatLngFromAddressURL(composedURL, i, globalLib.lodging);
	}
	
}

function getLatLngFromAddressURL( url, index, globalData ){
	$.get(url, ( response ) => {
		if (response.status == "OK") {
			console.log(response.results[0].geometry.location)
			hotelMarkers[index] = new google.maps.Marker({
				position: response.results[0].geometry.location,
				map: map,
				title: globalData[index].nombre_comercial
			});
			//console.log(hotelMarkers)
		}
	});
}

//Exported functions
module.exports.initGoogleMap = initGoogleMap
module.exports.getMarkersFromHotels = getMarkersFromHotels
