'use strict';

var PARSE_DEBUG = true;
// var PARSE_DEBUG = false;

if ( PARSE_DEBUG ) {
  var GROWL_DELAY = 0;
} else {
  var GROWL_DELAY = 3000;
}

var MODAL_DEBUG = true;
// var MODAL_DEBUG = false;

document.addEventListener('DOMContentLoaded', function() {

  // var h1 = document.getElementsByTagName('h1');
  // if (h1.length > 0) {
  //   h1[0].innerText = h1[0].innerText + ' \'Allo!';
  // }

  //$('#contenedor').html($('#contenedor').html() + '<p>Prueba de jquery!</p><br>');

  console.log('Iniciando Editor GIFT: GIFT-APP-1');

  test_growl_2 ();

  init_accordion ();

  events_init ();

  modal_events_init ();

}, false);
