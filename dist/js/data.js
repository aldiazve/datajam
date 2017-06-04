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
