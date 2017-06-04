(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//Global variables
const RETAURANTS_URL= "http://datosabiertos.vivelabbogota.com/dataset/39293ce0-f153-4209-a014-3fbc8b054eec/resource/38f5e305-a733-429f-a55d-d4999a88126d/download/restaurantes.csv";
const LODGING_URL="http://datosabiertos.vivelabbogota.com/dataset/98d1afc0-eecd-4251-b9a9-b7d2c691298f/resource/b1a5b668-44e7-4b0d-883c-a244734e13c3/download/alojamiento.csv";
const MUSEUMS_URL="http://datosabiertos.vivelabbogota.com/dataset/2cf1af9b-ce12-4572-a82f-fd01759f7865/resource/cb471e83-318d-434b-a05d-98de060a25a5/download/museos-de-bogota.csv";
const LIBRARIES_URL="http://datosabiertos.vivelabbogota.com/dataset/27e1fe65-e21e-40a2-bc86-28831ab460f6/resource/cb9adc96-146c-45c8-8c33-1df61655b2cb/download/bibliotecas-hemerotecas-y-cd-ciudad-de-bogota.csv";
const CULTURE_CENTERS_URL= "http://datosabiertos.vivelabbogota.com/dataset/87fd444d-7b8a-41ee-bf2e-f57ce99de58b/resource/fd221065-18b6-446e-b2f5-ef8d0bee81fa/download/centros-culturales-de-bogota.csv";
const THEATRES_URL="http://datosabiertos.vivelabbogota.com/dataset/3a255577-e9f1-4b94-95b5-2438cdaf0e3a/resource/4609ad97-27f7-4cbe-893a-21058f3685e5/download/teatros-identificados-en-bogota.csv";
const CULTURE_HOUSES_URL= "http://datosabiertos.vivelabbogota.com/dataset/58f8f63c-2c9b-4e66-aa3c-96fbeb502847/resource/324dc497-e6a4-4089-8b22-b859a14f5f3f/download/casas-de-la-cultura-de-bogota.csv";

//dependencies
var globalLib = require("./globalLib");
var map = require("./map");
//
var proxy='https://cors-anywhere.herokuapp.com/';

function csvToArray(data){
  var objects = $.csv.toObjects(data,{onParseValue: $.csv.hooks.castToScalar});
  return objects;
}

function initDataSets(){
	loadData(globalLib.datasetCases["RESTAURANTS"]);
	loadData(globalLib.datasetCases["LODGING"]);
	loadData(globalLib.datasetCases["MUSEUMS"]);
	loadData(globalLib.datasetCases["LIBRARIES"]);
	loadData(globalLib.datasetCases["CULTURE_CENTERS"]);
	loadData(globalLib.datasetCases["THEATRES"]);
	loadData(globalLib.datasetCases["CULTURE_HOUSES"]);
}

function loadData(type){
	switch(type) {
	    case globalLib.datasetCases["RESTAURANTS"] :
        var xmlhttp = new XMLHttpRequest();
        var url = proxy+RETAURANTS_URL;
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myCsv = xmlhttp.responseText;
            var jsont = csvJSON(myCsv);
            var json =  JSON.parse(jsont);
            globalLib.restaurants=json;
            map.getMarkersFromData(json, type);

          }
        };
	    break;
	  	case globalLib.datasetCases["LODGING"] :
	     var xmlhttp = new XMLHttpRequest();
       var url = proxy+LODGING_URL;
       xmlhttp.open("GET", url, true);
       xmlhttp.send();
       xmlhttp.onreadystatechange = function() {
         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
           var myCsv = xmlhttp.responseText;
           var jsont = csvJSON(myCsv);
           var json =  JSON.parse(jsont);
           globalLib.lodging=json;
           map.getMarkersFromData(json, type);

         }
       };

	    break;
	  	case globalLib.datasetCases["MUSEUMS"] :
        var xmlhttp = new XMLHttpRequest();
        var url = proxy+MUSEUMS_URL;
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myCsv = xmlhttp.responseText;
            var jsont = csvJSON(myCsv);
            var json =  JSON.parse(jsont);
            globalLib.museums=json;
            map.getMarkersFromData(json, type);

          }
        };
	    break;
	  	case globalLib.datasetCases["LIBRARIES"] :
      var xmlhttp = new XMLHttpRequest();
      var url = proxy+LIBRARIES_URL;
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myCsv = xmlhttp.responseText;
            var jsont = csvJSON(myCsv);
            var json =  JSON.parse(jsont);
            globalLib.libraries=json;
            map.getMarkersFromData(json, type);
          }
        };
	    break;
	  	case globalLib.datasetCases["CULTURE_CENTERS"] :
        var xmlhttp = new XMLHttpRequest();
        var url = proxy+CULTURE_CENTERS_URL;
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myCsv = xmlhttp.responseText;
            var jsont = csvJSON(myCsv);
            var json =  JSON.parse(jsont);
            globalLib.cultureCenters=json;
            map.getMarkersFromData(json, type);

          }
        };
	    break;
	  	case globalLib.datasetCases["THEATRES"] :
        var xmlhttp = new XMLHttpRequest();
        var url = proxy+THEATRES_URL;
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myCsv = xmlhttp.responseText;
            var jsont = csvJSON(myCsv);
            var json =  JSON.parse(jsont);
            globalLib.theatres=json;
            map.getMarkersFromData(json, type);

          }
        };
	    break;
	  	case globalLib.datasetCases["CULTURE_HOUSES"] :
        var xmlhttp = new XMLHttpRequest();
        var url = proxy+CULTURE_HOUSES_URL;
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myCsv = xmlhttp.responseText;
            var jsont = csvJSON(myCsv);
            var json =  JSON.parse(jsont);
            globalLib.cultureHouses=json;
            map.getMarkersFromData(json, type);
          }
        };
	   	break;
	}
}


function csvJSON(csv){

  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

	  var obj = {};
	  var currentline=lines[i].split(",");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }

	  result.push(obj);

  }

  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}

//exported funcs
module.exports.initDataSets = initDataSets

},{"./globalLib":2,"./map":4}],2:[function(require,module,exports){
var datasetCases = {
	"RESTAURANTS" : "RESTAURANTS",
	"LODGING" : "LODGING",
	"MUSEUMS" : "MUSEUMS",
	"LIBRARIES" : "LIBRARIES",
	"CULTURE_CENTERS" : "CULTURE_CENTERS",
	"THEATRES" : "THEATRES",
	"CULTURE_HOUSES" : "CULTURE_HOUSES"
}

var restaurants = []
var lodging = []
var museums = []
var libraries = []
var cultureCenters = []
var theatres = []
var cultureHouses = []

module.exports.restaurants = restaurants
module.exports.lodging = lodging
module.exports.museums = museums
module.exports.libraries = libraries
module.exports.cultureCenters = cultureCenters
module.exports.theatres = theatres
module.exports.cultureHouses = cultureHouses
module.exports.datasetCases = datasetCases

},{}],3:[function(require,module,exports){
//dependencies
var mapLib = require("./map");
var globalLib = require("./globalLib");
function initGoogleMap() {
	mapLib.initGoogleMap();
}

function showStatistics(){

}

var main = {}

main.initGoogleMap = initGoogleMap
main.showStatistics = showStatistics

window.main = main

function detail_card(origin) {
		var hotel;
		$('.card').removeClass('hide');

		//find
		for (var i = 0; i < globalLib.lodging.length; i++) {
				if(globalLib.lodging[i].nro===origin.nro){
					hotel= globalLib.lodging[i];
					console.log(hotel);
					break;
				}
		}
		var name='Nombre: '+hotel.nombre_comercial;
    var phone= 'Telefono: '+hotel.telefono;
    var email = 'Email: '+ hotel.email;
		var price = 'Rango Tarifa: ' + hotel.rango_tarifa;
		var type = 'Tipo: '+ hotel.tipo;
		var local= 'Localidad: '+ hotel.localidad;

    //DOM traversing
    $('#statis2').removeClass('hide');
    $('.card-title').text(hotel.nombre_comercial);
    $('#ad').text('Dirección: '+hotel.direccion);
    $('#name').text(name);
		$('#email').text(email);
    $('#phone').text(phone);
		$('#type').text(type);
		$('#local').text(local);
		$('#price').text(price);

}
function showStatistics(){
	$('#chart').removeClass('hide');
}
$(document).ready(function(){
    $('.carousel').carousel();
		$('#restaurants').change( mapLib.filter.filterResta);
		$('#museums').change(mapLib.filter.filterMuse);
		$('#libraries').change( mapLib.filter.filterLib);
		$('#culture_center').change( mapLib.filter.filterCul);
		$('#theatres').change( mapLib.filter.filterThe);
		$('#statistics1').on('click', main.showStatistics);


});
module.exports.detail_card = detail_card

},{"./globalLib":2,"./map":4}],4:[function(require,module,exports){
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

var directionService;
var directionRenderer;

var closerPlaces = { 
	"RESTAURANTS" : 0,
	"MUSEUMS" : 0,
	"LIBRARIES" : 0,
	"CULTURE_CENTERS" : 0,
	"THEATRES" : 0
};

var hotelSelected = false;
var hotelSeleMarker;

function initGoogleMap() {
	map = new google.maps.Map(document.getElementById('mapDiv'), {
		center: BOG_LAT_LOG,
		zoom: 16
	});
	data.initDataSets()

	directionService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
	console.log("Map loaded");
}

//draw on the map the route between two points.
function getRoute( destinationMarker ){
	var originPoint = hotelSeleMarker.position;
	var request = {
	    origin: originPoint,
	    destination: destinationMarker.position,
	    travelMode: 'TRANSIT',
	    transitOptions: {
		    modes: ['BUS']
		},
  	};
  	directionsRenderer.setPanel(document.getElementById('routeDraw'))
	directionService.route(request, function(result, status) {
		console.log(status);
	    if (status == 'OK') {
	      directionsRenderer.setDirections(result);
	      
	    }
  	});
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

	    marker.addListener('click', drawRoute);
	}
}

function drawRoute(){
	getRoute( this );
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
	map.setZoom(12);
	map.panTo(this.position);

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
	//details
	console.log(this);
	main.detail_card(this);

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

},{"./data":1,"./globalLib":2,"./main":3}]},{},[3]);
