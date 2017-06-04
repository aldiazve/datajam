//dependencies
var mapLib = require("./map");
var globalLib = require("./globalLib");
function initGoogleMap() {
	mapLib.initGoogleMap();
}

var main = {}

main.initGoogleMap = initGoogleMap

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
		var price = 'Rango Tarifa:' + hotel.rango_tarifa;
		var type = 'Tipo :'+ hotel.tipo;
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

$(document).ready(function(){
      $('.carousel').carousel();
			$('#restaurants').change( mapLib.filter.filterResta);
			$('#museums').change(mapLib.filter.filterMuse);
			$('#libraries').change( mapLib.filter.filterLib);
			$('#culture_center').change( mapLib.filter.filterCul);
			$('#theatres').change( mapLib.filter.filterThe);
});
module.exports.detail_card = detail_card
