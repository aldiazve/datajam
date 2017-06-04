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
