// constans
const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const MAPS_KEY = "&key=AIzaSyA_EME4XtUVfx0p4qhtLJujPci1QzY20qs";
const COUNTRY_ISO = ",Bogota"
const BOG_LAT_LOG = {lat: 4.6097100, lng: -74.0817500};

// Dependencies
var globalLib = require("./globalLib")
var data = require("./data")
// map instace
var map;
var hotelMarkers = [];
var restaurantMarkers = [];
var museumMarkers = [];
var librariesMarkers = [];
var centerMarkers = [];
var theatreMarkers = [];

var hotelSelected=false;
var hotelSeleMarker;

function initGoogleMap() {
	map = new google.maps.Map(document.getElementById('mapDiv'), {
		center: BOG_LAT_LOG,
		zoom: 11
	});
	data.initDataSets()
	console.log("Map loaded");
}

function getMarkersFromData( hotelsData, type ){
	var composedURL = ""
	console.log(globalLib);
	switch(type) {
	    case globalLib.datasetCases["RESTAURANTS"] :
				for (var i = 0; i < hotelsData.length; i++) {
					composedURL = GEOCODE_URL + hotelsData[i].direccion + COUNTRY_ISO + MAPS_KEY
					getLatLngFromAddressURLRes(composedURL, i, globalLib.restaurants, restaurantMarkers);
				}
	    break;
			case globalLib.datasetCases["LODGING"] :
				for (var i = 0; i < hotelsData.length; i++) {
					composedURL = GEOCODE_URL + hotelsData[i].direccion + COUNTRY_ISO + MAPS_KEY
					getLatLngFromAddressURLRes(composedURL, i, globalLib.lodging, hotelMarkers);
				}
	    break;
	  	case globalLib.datasetCases["MUSEUMS"] :
				for (var i = 0; i < hotelsData.length; i++) {
					composedURL = GEOCODE_URL + hotelsData[i].direccion + COUNTRY_ISO + MAPS_KEY
					getLatLngFromAddressURLMus(composedURL, i, globalLib.museums, museumMarkers);
				}
	    break;
	  	case globalLib.datasetCases["LIBRARIES"] :
				for (var i = 0; i < hotelsData.lengtmuseumMarkersh; i++) {
					composedURL = GEOCODE_URL + hotelsData[i].direccion + COUNTRY_ISO + MAPS_KEY
					getLatLngFromAddressURLMus(composedURL, i, globalLib.museums, librariesMarkers);
				}
	    break;
	  	case globalLib.datasetCases["CULTURE_CENTERS"] :
				for (var i = 0; i < hotelsData.length; i++) {
					composedURL = GEOCODE_URL + hotelsData[i].direccion + COUNTRY_ISO + MAPS_KEY
					getLatLngFromAddressURLMus(composedURL, i, globalLib.museums, centerMarkers);
				}
	    break;
	  	case globalLib.datasetCases["THEATRES"] :
				for (var i = 0; i < hotelsData.length; i++) {
					composedURL = GEOCODE_URL + hotelsData[i].direccion + COUNTRY_ISO + MAPS_KEY
					getLatLngFromAddressURLMus(composedURL, i, globalLib.museums, theatreMarkers);
				}
	    break;
	  	case globalLib.datasetCases["CULTURE_HOUSES"] :
				for (var i = 0; i < hotelsData.length; i++) {
					composedURL = GEOCODE_URL + hotelsData[i].direccion + COUNTRY_ISO + MAPS_KEY
					getLatLngFromAddressURLMus(composedURL, i, globalLib.museums, centerMarkers);
				}
	   	break;
	}


}

function events_marker(market, content, map, info) {

    google.maps.event.addListener(market, 'mouseover', (function(market,content,info) {
        return function () {
            info.setContent(content);
            info.open(map,market);
        }
    })(market,content,info));

    google.maps.event.addListener(market, 'mouseout', (function(market,content,info) {
        return function () {
            info.close(map,market);
        }
    })(market,content,info));

		google.maps.event.addListener(market, 'click', (function(market,content,info) {
				return function (market) {
						for ( i = 0; i < hotelMarkers.length; i++) {

					map	}

						hotelSelected= true;
						hotelSeleMarker= market;
				}
		})(market,content,info));
}

function getLatLngFromAddressURLRes( url, index, globalData, arrayMarkers){
	console.log(globalData);
	$.get(url, ( response ) => {
				console.log(response);
		if (response.status == "OK") {
			var image = {
					url: 'img/hotel.png',
					size: new google.maps.Size(40, 40),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(17, 34),
					scaledSize: new google.maps.Size(30, 30)
			}
			console.log(response.results[0].geometry.location)
			var title = ""

			arrayMarkers[index] = new google.maps.Marker({
				position: response.results[0].geometry.location,
				map: map,
				title: globalData[index].nombre_comercial,
				icon: image,
				nro: globalData[index].nro,
				localidad: globalData[index].localidad
			});

			var content= 'Nombre: '+globalData[index].nombre_comercial + ', Dirección: '+globalData[index].direccion;
      var info = new google.maps.InfoWindow();

      var events= new events_marker(arrayMarkers[index], content, map, info);
		}
	});
}

function getLatLngFromAddressURLMus( url, index, globalData, arrayMarkers){
	console.log(globalData);
	$.get(url, ( response ) => {
				console.log(response);
		if (response.status == "OK") {
			var image = {
					url: 'img/libros.png',
					size: new google.maps.Size(40, 40),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(17, 34),
					scaledSize: new google.maps.Size(30, 30)
			}
			console.log(response.results[0].geometry.location)

			arrayMarkers[index] = new google.maps.Marker({
				position: response.results[0].geometry.location,
				map: map,
				title: globalData[index].nombre_del_museo,
				icon: image,
				nro: globalData[index].nro,
				localidad: globalData[index].localidad
			});

			var content= 'Nombre: '+globalData[index].nombre_del_museo + ', Dirección: '+globalData[index].direccion;
      var info = new google.maps.InfoWindow();

      var events= new events_marker(arrayMarkers[index], content, map, info);
		}
	});
}

//filters
function filterResta(){
	if(document.getElementById('restaurants').checked){
		sitesHotel('restaurants');
	}else{
		console.log('no');
	}
}
function filterMuse(){
	if(document.getElementById('museums').checked){
			sitesHotel('museums');
	}else{
		console.log('no');
	}
}
function filterLib(){
	if(document.getElementById('libraries').checked){
		sitesHotel('libraries');
	}else{
		console.log('no');
	}
}
function filterCul(){
	if(document.getElementById('culture_center').checked){
		sitesHotel('culture_center');
	}else{
		console.log('no');
	}
}
function filterThe(){
	if(document.getElementById('theatres').checked){
		sitesHotel('theatres');
	}else{
		console.log('no');
	}
}
var filter = {}

filter.filterResta=filterResta
filter.filterMuse=filterMuse
filter.filterLib=filterLib
filter.filterCul=filterCul
filter.filterThe=filterThe
//Exported functions
module.exports.initGoogleMap = initGoogleMap
module.exports.getMarkersFromData = getMarkersFromData
module.exports.filter = filter
