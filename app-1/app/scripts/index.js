/*jslint node: true */
"use strict";

var test_function = function test_function ( _where ) {
  var brand = document.getElementById('navbar_brand_gift');
  if ( brand !== null ) {
    var textoInicial = 'GIFT Format Editor ¡APP! - ' + _where;
    brand.innerText = textoInicial;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var h1 = document.getElementsByTagName('h3');
  if (h1.length > 0) {
    h1[0].innerText = h1[0].innerText + ' \...';
  }

  test_function ( 'index.js');
  console.log ( 'Running index.js' );
}, false);
