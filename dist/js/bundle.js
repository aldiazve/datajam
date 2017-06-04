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
	    	$.get(proxy + RETAURANTS_URL, (data) => {
	  			globalLib = csvToArray(data)
	  		});
	    break;
	  	case globalLib.datasetCases["LODGING"] :
	    	$.get(proxy + LODGING_URL, (data) => {
	  			globalLib.lodging = csvToArray(data)
          map.getMarkersFromHotels(globalLib.lodging);
	 	 	});
	    break;
	  	case globalLib.datasetCases["MUSEUMS"] :
	    	$.get(proxy + MUSEUMS_URL, (data) => {
	  			globalLib.museums = csvToArray(data)
		  	});
	    break;
	  	case globalLib.datasetCases["LIBRARIES"] :
	    	$.get(proxy + LIBRARIES_URL, (data) => {
	  			globalLib.libraries = csvToArray(data)
	 	 	});
	    break;
	  	case globalLib.datasetCases["CULTURE_CENTERS"] :
	    	$.get(proxy + CULTURE_CENTERS_URL, (data) => {
	  			globalLib.cultureCenters = csvToArray(data)
	 	 	});
	    break;
	  	case globalLib.datasetCases["THEATRES"] :
	    	$.get(proxy + THEATRES_URL, (data) => {
	  			globalLib.theatres = csvToArray(data)
	  		});
	    break;
	  	case globalLib.datasetCases["CULTURE_HOUSES"] :
	    	$.get(proxy + CULTURE_HOUSES_URL, (data) => {
	  			globalLib.cultureCenters = csvToArray(data)
	  		});
	   	break;
	}
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

function initGoogleMap() {
	mapLib.initGoogleMap();
}

var main = {}

main.initGoogleMap = initGoogleMap

window.main = main

$(document).ready(function(){
      $('.carousel').carousel();
});

},{"./map":4}],4:[function(require,module,exports){
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

},{"./data":1,"./globalLib":2}]},{},[3]);
