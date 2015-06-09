'use strict';

var test_growl = function test_growl ()
{
  $('#boton_test_growl').click (function (){
    $.bootstrapGrowl( '<strong>Growl Success!!!</strong>', {
      type: 'info',
      align: 'center',
      width: 'auto'
    } );
  });
}
