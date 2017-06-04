// constans
const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const MAPS_KEY = "&key=AIzaSyA_EME4XtUVfx0p4qhtLJujPci1QzY20qs";
const COUNTRY_ISO = ",Bogota"
const BOG_LAT_LOG = {lat: 4.6097100, lng: -74.0817500};

// Dependencies
var globalLib = require("./globalLib")
var data = require("./data")
var main = require("./main")
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
		zoom: 16
	});
	data.initDataSets()
	console.log("Map loaded");
}

function getMarkersFromData( hotelsData, type ){
	var composedURL = ""
	switch(type) {
	    case globalLib.datasetCases["RESTAURANTS"] :
				for (var i = 0; i < hotelsData.length; i++) {
					composedURL = GEOCODE_URL + hotelsData[i].direccion + COUNTRY_ISO + MAPS_KEY
					getLatLngFromAddressURLRes(composedURL, i, globalLib.restaurants, restaurantMarkers, "RESTAURANTS" );
				}
	    break;
			case globalLib.datasetCases["LODGING"] :
				for (var i = 0; i < hotelsData.length; i++) {
					composedURL = GEOCODE_URL + hotelsData[i].direccion + COUNTRY_ISO + MAPS_KEY
					getLatLngFromAddressURLRes(composedURL, i, globalLib.lodging, hotelMarkers, "LODGING");
				}
	    break;
	  	case globalLib.datasetCases["MUSEUMS"] :
				for (var i = 0; i < hotelsData.length; i++) {
					composedURL = GEOCODE_URL + hotelsData[i].direccion + COUNTRY_ISO + MAPS_KEY
					getLatLngFromAddressURLMus(composedURL, i, globalLib.museums, museumMarkers, "MUSEUMS");
				}
	    break;
	  	case globalLib.datasetCases["LIBRARIES"] :
				for (var i = 0; i < hotelsData.lengtmuseumMarkersh; i++) {
					composedURL = GEOCODE_URL + hotelsData[i].direccion + COUNTRY_ISO + MAPS_KEY
					getLatLngFromAddressURLMus(composedURL, i, globalLib.museums, librariesMarkers ,"LIBRARIES");
				}
	    break;
	  	case globalLib.datasetCases["CULTURE_CENTERS"] :
				for (var i = 0; i < hotelsData.length; i++) {
					composedURL = GEOCODE_URL + hotelsData[i].direccion + COUNTRY_ISO + MAPS_KEY
					getLatLngFromAddressURLMus(composedURL, i, globalLib.museums, centerMarkers, "CULTURE_CENTERS");
				}
	    break;
	  	case globalLib.datasetCases["THEATRES"] :
				for (var i = 0; i < hotelsData.length; i++) {
					composedURL = GEOCODE_URL + hotelsData[i].direccion + COUNTRY_ISO + MAPS_KEY
					getLatLngFromAddressURLMus(composedURL, i, globalLib.museums, theatreMarkers, "THEATRES");
				}
	    break;
	  	case globalLib.datasetCases["CULTURE_HOUSES"] :
				for (var i = 0; i < hotelsData.length; i++) {
					composedURL = GEOCODE_URL + hotelsData[i].direccion + COUNTRY_ISO + MAPS_KEY
					getLatLngFromAddressURLMus(composedURL, i, globalLib.museums, centerMarkers, "CULTURE_HOUSES");
				}
	   	break;
	}


}

function events_marker(marker, content, map, info) {
	if (!(typeof marker === "undefined")){
		 google.maps.event.addListener(marker, 'mouseover', (function(marker,content,info) {
	        return function () {
	            info.setContent(content);
	            info.open(map,marker);
	        }
	    })(marker,content,info));

	    google.maps.event.addListener(marker, 'mouseout', (function(marker,content,info) {
	        return function () {
	            info.close(map,marker);
	        }
	    })(marker,content,info));

	    marker.addListener('click', hotelOnClick);
	}
}

function hotelOnClick(){
	for ( i = 0; i < hotelMarkers.length; i++) {
		if (!(typeof hotelMarkers[i] === "undefined")) {
			hotelMarkers[i].setMap(null);
		}
	}
	this.setMap(map);
	hotelSelected = true;
	hotelSeleMarker = this;
	//details
	console.log(this);
	main.detail_card(this);

}
		/*
		 function(marker,content,info) {
				;
				return function (marker) {

						for ( i = 0; i < hotelMarkers.length; i++) {
							if (!(typeof hotelMarkers[i]=== "undefined")) {
								hotelMarkers[i].setMap(null);
							}
						}
						marker.setMap(map);
						hotelSelected= true;
						hotelSeleMarker= marker;
				}
		})(marker,content,info));
		*/


function getLatLngFromAddressURLRes( url, index, globalData, arrayMarkers, type){
	$.get(url, ( response ) => {
				console.log(response);
		if (response.status == "OK") {
			if (type == "LODGING") {
				var image = makeMarkerImage('img/hotel.png')
				console.log(response.results[0].geometry.location)
				var title = ""

				arrayMarkers[index] = new google.maps.Marker({
					position: response.results[0].geometry.location,
					title: globalData[index].nombre_comercial,
					icon: image,
					map : map,
					nro: globalData[index].nro,
					localidad: globalData[index].localidad
				});

				var content= 'Nombre: '+globalData[index].nombre_comercial + ', Dirección: '+globalData[index].direccion;
	        	var info = new google.maps.InfoWindow();
	        	var events= new events_marker(arrayMarkers[index], content, map, info);
			}else{
				var image = makeMarkerImage('img/restaurante.png');
				arrayMarkers[index] = new google.maps.Marker({
					position: response.results[0].geometry.location,
					title: globalData[index].nombre_comercial,
					icon: image,
					nro: globalData[index].nro,
					localidad: globalData[index].localidad
				});

				var content= 'Nombre: '+globalData[index].nombre_comercial + ', Dirección: '+globalData[index].direccion;
	        	var info = new google.maps.InfoWindow();
	        	var events= new events_marker(arrayMarkers[index], content, map, info);
			}


		}
	});
}

function getLatLngFromAddressURLMus( url, index, globalData, arrayMarkers, type){
	if (!(typeof globalData[index] === "undefined")) {
		$.get(url, ( response ) => {
			if (response.status == "OK") {
				var image;
				if (type == "MUSEUMS") {
					image = makeMarkerImage('/img/museos.png');
				}else if (type == "LIBRARIES") {
					image = makeMarkerImage('img/libros');
				}else if (type == "CULTURE_CENTERS") {
					image = makeMarkerImage('/img/museos.png');
				}else if (type == "THEATRES") {
					image = makeMarkerImage('img/coctel.png');
				}else {
					image = makeMarkerImage('img/museos.png');
				}
				arrayMarkers[index] = new google.maps.Marker({
					position: response.results[0].geometry.location,
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
}

function makeMarkerImage( imageURL){
	var image = {
					url: imageURL,
					size: new google.maps.Size(40, 40),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(17, 34),
					scaledSize: new google.maps.Size(30, 30)
				}
	return image;
}

function addMarkersToMap( arrayMarkers ){
	for (var i = 0; i < arrayMarkers.length; i++) {
		if (!(typeof arrayMarkers[i]=== "undefined")) {
			arrayMarkers[i].setMap(map);
		}

	}
}

function removeMarkersFromMap( arrayMarkers ){
	for (var i = 0; i < arrayMarkers.length; i++) {
		if (!(typeof arrayMarkers[i]=== "undefined")) {
			arrayMarkers[i].setMap(null);
		}
	}
}

//filters
function filterResta(){
	if(document.getElementById('restaurants').checked){
		addMarkersToMap(restaurantMarkers);
	}else{
		removeMarkersFromMap(restaurantMarkers)
	}
}
function filterMuse(){
	if(document.getElementById('museums').checked){
		addMarkersToMap(museumMarkers);
	}else{
		removeMarkersFromMap(museumMarkers)
	}
}
function filterLib(){
	if(document.getElementById('libraries').checked){
		addMarkersToMap(librariesMarkers);
	}else{
		removeMarkersFromMap(librariesMarkers)
	}
}
function filterCul(){
	if(document.getElementById('culture_center').checked){
		addMarkersToMap(centerMarkers);
	}else{
		removeMarkersFromMap(centerMarkers)
	}
}
function filterThe(){
	if(document.getElementById('theatres').checked){
		addMarkersToMap(theatreMarkers);
	}else{
		removeMarkersFromMap(theatreMarkers)
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
