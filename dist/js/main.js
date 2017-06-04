//dependencies
var mapLib = require("./map")
var data = require("./data")


function initGoogleMap() {
	mapLib.initGoogleMap();
}

var main = {}

main.initGoogleMap = initGoogleMap

window.main = main

$(document).ready(function(){
      $('.carousel').carousel();
      data.initDataSets();
});