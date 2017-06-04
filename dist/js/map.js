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

var closerPlaces = { 
	"RESTAURANTS" : 0,
	"MUSEUMS" : 0,
	"LIBRARIES" : 0,
	"CULTURE_CENTERS" : 0,
	"THEATRES" : 0
};

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

	    //marker.addListener('click', hotelOnClick);
	}
}

function eventsMakerHotel(marker, content, map, info) {
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

	var markerLocal = getCleanedString(this.localidad)

	for (var i = 0; i < globalLib.restaurants.length; i++) {
		if (!(globalLib.restaurants[i].nro == "")) {
			console.log(getCleanedString(globalLib.restaurants[i].localidad) == markerLocal);
			if (getCleanedString(globalLib.restaurants[i].localidad) == markerLocal) {
				closerPlaces["RESTAURANTS"] += 1;
			}	
		}
	}
	for (var i = 0; i < globalLib.museums.length; i++) {
		if (globalLib.museums[i].localidad == this.localidad) {
			closerPlaces["MUSEUMS"] += 1;
		}	
	}
	for (var i = 0; i < globalLib.libraries.length; i++) {
		if (globalLib.libraries[i].localidad == this.localidad) {
			closerPlaces["LIBRARIES"] += 1;
		}	
	}
	for (var i = 0; i < globalLib.cultureCenters.length; i++) {
		if (globalLib.cultureCenters[i].localidad == this.localidad) {
			closerPlaces["CULTURE_CENTERS"] += 1;
		}	
	}
	for (var i = 0; i < globalLib.theatres.length; i++) {
		if (globalLib.theatres[i].localidad == this.localidad) {
			closerPlaces["THEATRES"] += 1;
		}	
	}

	var chart = c3.generate({
          data: {
              columns: [
                  ['Museos Cercanos: ', closerPlaces["MUSEUMS"]],
                  ['Restaurantes Cercanos: ', closerPlaces["RESTAURANTS"]],
                  ['Librerías Cercanas: ', closerPlaces["LIBRARIES"]],
                  ['Teatros Cercanos: ', closerPlaces["THEATRES"]],
                  ['Centros Culturales Cercanos: ', closerPlaces["CULTURE_CENTERS"]]
              ],
              type : 'donut',
          },
          donut: {
              title: "Lugares de interés"
          },
          size: {

          }

      });

	console.log(closerPlaces);

	hotelSelected = true;
	hotelSeleMarker = this;
}
 
function getCleanedString(cadena){
   // Definimos los caracteres que queremos eliminar
   var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";

   // Los eliminamos todos
   for (var i = 0; i < specialChars.length; i++) {
       cadena= cadena.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
   }

   // Quitamos espacios y los sustituimos por _ porque nos gusta mas asi
   cadena = cadena.replace(/ /g,"");

   // Quitamos acentos y "ñ". Fijate en que va sin comillas el primer parametro
   cadena = cadena.replace(/á/gi,"a");
   cadena = cadena.replace(/é/gi,"e");
   cadena = cadena.replace(/í/gi,"i");
   cadena = cadena.replace(/ó/gi,"o");
   cadena = cadena.replace(/ú/gi,"u");
   cadena = cadena.replace(/ñ/gi,"n");

   // Lo queremos devolver limpio en minusculas
   cadena = cadena.toUpperCase();
   return cadena;
}


function getLatLngFromAddressURLRes( url, index, globalData, arrayMarkers, type){
	$.get(url, ( response ) => {
		if (response.status == "OK") {
			if (type == "LODGING") {
				var image = makeMarkerImage('img/hotel.png')
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
	        	var events= new eventsMakerHotel(arrayMarkers[index], content, map, info);
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
					image = makeMarkerImage('img/teatro.png');
				}else {
					image = makeMarkerImage('img/casaCultural.png');
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
