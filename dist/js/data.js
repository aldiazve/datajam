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
            console.log(globalLib.cultureHouses);
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
