/*jslint node: true */
"use strict";

var test_function = function test_function ( _where ) {
  var brand = document.getElementById('navbar_brand_gift');
  if ( brand !== null ) {
    var textoInicial = 'GIFT Format Editor ¡APP! - ' + _where;
    brand.innerText = textoInicial;
  }
}

// Listens for the app launching then creates the window
chrome.app.runtime.onLaunched.addListener(function() {
  var width = 600;
  var height = 400;

  chrome.app.window.create('index.html', {
    id: 'main',
    bounds: {
      width: width,
      height: height,
      left: Math.round((screen.availWidth - width) / 2),
      top: Math.round((screen.availHeight - height)/ 2)
    }
  });

  test_function ( 'main.js');
  console.log ( 'Running main.js' );

  var texto = document.getElementById('text1');
  if ( texto !== null ) {
    var textoInicial = '// Comentario \n::T4::Q1\n\n\n';
    texto.innerText = textoInicial;
  }


  $('#button-process').click (function() {
    var mensaje = peg_parser.parse($('#text1').text() );
    var resultado = document.getElementById('text2');
    resultado.innerText = 'Titulo: ' + mensaje[0].Title+ '\n\nComentario: ' + mensaje[0].Comment+ '\n\nPregunta: '+ mensaje[0].Text.Question+ '\n\nRespuesta: &lt;' + mensaje[0].Text.Answer + '&gt;';

    console.debug (mensaje[0]);
    console.debug (resultado);
  });


  $('#button_example_1').click ( function () {parseExample(1);} );
  $('#button_example_2').click ( function () {parseExample(2);} );
  $('#button_example_3').click ( function () {parseExample(3);} );
  $('#button_example_4').click ( function () {parseExample(4);} );
  $('#button_example_extra').click ( function () {parseExample('extra');} );


  $(function() {
  $( '#accordion1' )
    .accordion({
      header: '> div > div.acc_title',
      collapsible: true,
      heightStyle: 'content'
    })
    .sortable({
      axis: 'y',
  //    handle: 'div.acc_title',
      handle: 'span.ui-accordion-header-icon',
      stop: function( event, ui ) {
        // IE doesn't register the blur when sorting
        // so trigger focusout handlers to remove .ui-state-focus
        ui.item.children( 'div.acc_title' ).triggerHandler( 'focusout' );

        // Refresh accordion to handle new order
        $( this ).accordion( 'refresh' );
      }
    });
  });

  $(function() {
  $( '#accordion2' )
    .accordion({
      header: '> div > div.acc_title',
      collapsible: true,
      heightStyle: 'content'
    })
    .sortable({
      axis: 'y',
  //    handle: 'div.acc_title',
      handle: 'span.ui-accordion-header-icon',
      stop: function( event, ui ) {
        // IE doesn't register the blur when sorting
        // so trigger focusout handlers to remove .ui-state-focus
        ui.item.children( 'div.acc_title' ).triggerHandler( 'focusout' );

        // Refresh accordion to handle new order
        $( this ).accordion( 'refresh' );
      }
    });
  });

  var PARSE_DEBUG = false;

  if ( PARSE_DEBUG ) {
    var GROWL_DELAY = 0;
  } else {
    var GROWL_DELAY = 3000;
  }


  if ( $('#text_gift_input' ).val() === '' ) {
    $('#text_gift_input' ).val( '// Tipo: fill in the blanks - end\n::T1a::Two plus two\nequals {=four =4}\n\n// Tipo: fill in the blanks - middle\n::T1b::Two plus {=two =2}\nequals four.\n\n// Tipo: fill in the blanks - start\n::T1c::{=Two =2} plus two\nequals four.\n\n// Tipo: matching\n::Food for animals:: Which animal eats which food?\n{ =cat -> cat food =dog -> dog food =fish -> fish food }\n\n// Tipo: description/instructions (not really a question)\n::Descripción del examen::Este es un examen\nde prueba en el que no se pueden usar ni\nlápiz ni papel\n\n// Tipo essay\n::Opinión sobre texto de relleno::Escriba su\nopinión sobre si el texto de relleno\nllamado "Lorem ipsum dolor" debería actualizarse a\nlos tiempos o debería seguir intacto\n{}\n\n// Tipo: True/false\n::Lengua - codos::\n¿Puede usted llegar con su lengua a\ncualquiera de sus dos codos?\n{F}\n\n// Tipo: math tolerance question\n::Platos de un menú::¿Cuántos platos\ntiene un menú del día? {#2:1}\n\n// Tipo: math range question\n::Entre 3 y 7::Dígame un número entre\n3 y 7 {#3..7}\n' );
  }


  $('#button_gift_input').click( function () {
    try {
      parseText('#text_gift_input', '#accordion1' );
    } catch ( myException ) {
      if ( PARSE_DEBUG ) {
        console.error ('Exception caught: ' + myException );
      }
      $.bootstrapGrowl( '<strong>Exception caught</strong>: ' +  myException, {
        type: 'danger',
        align: 'center',
        width: 'auto',
        delay: GROWL_DELAY
      } );
    }
  } );


});

function parseExample ( nExample )
{
  var _end = {'state':'not_begun', 'message':'Parsing not begun.'};
  var _origen = $('#example_text_' + nExample).text();
  switch (jQuery.type(_origen)) {
    case 'undefined':
    _end.state = 'error';
    _end.message = '#example_text_' + nExample + ' is undefined.' ;
      break;
    case 'null':
    _end.state = 'error';
    _end.message = '#example_text_' + nExample + ' is null.';
      break;
    case 'string':
      if (_origen.length > 0) {
        var _mensaje;
        try {
          _mensaje = peg_parser.parse (_origen );
        } catch (e) {
          if (e instanceof SyntaxError) {
            console.error ('SyntaxError exception.');
            _end.state = 'error';
            _end.message = 'Error: '+_mensaje.message;
          } else {
            console.error ('Unknown exception.');
            _end.state = 'error';
            _end.message = 'Unrecognized exception.';
          }
        }
        if ( _mensaje.name !== 'SyntaxError' ) {
          var _texto = 'Titulo: "' + _mensaje[0].Title+ '"\n\nComentario: "' + _mensaje[0].Comment+ '"\n\nPregunta: "'+ _mensaje[0].Text.Question+ '"\n\nRespuesta: "' + _mensaje[0].Text.Answer + '"';
          $('#example_dest_' + nExample ).text( _texto );
          _end.state = 'success';
          _end.message = 'Convirtiendo (#example_text_' + nExample + ') ' + _origen + '" a "' + _texto + '"';
        } else {
          _end.state = 'error';
          _end.message = _mensaje.message;
        }
      } else {
        _end.state = 'warning';
        _end.message = '#example_text_' + nExample + ' has 0 length.';
      }
      break;
    default:
      _end.state = 'error';
      _end.message = '#example_text_' + nExample + ' is ' + jQuery.type(_origen);
  }

  switch (_end.state) {
    case 'success':
      console.info ( _end.message );
      $('#example_'+nExample+' .alert').addClass('alert-success fade in').show().html('<strong>Success</strong>: ' + _end.message);
      break;
    case 'warning':
      console.warn ( _end.message );
      $('#example_'+nExample+' .alert').addClass('alert-warning fade in').show().html('<strong>Warning</strong>: ' + _end.message);
      break;
    case 'error':
      console.error ( _end.message );
      $('#example_'+nExample+' .alert').addClass('alert-error fade in').show().html('<strong>Error</strong>: ' + _end.message);
      break;
    case 'not_begun':
      console.error ( _end.message );
      $('#example_'+nExample+' .alert').addClass('alert-error fade in').show().html('<strong>Error</strong>: ' + _end.message);
      break;
    default:
      console.error ( 'Undefined error!' );
      $('#example_'+nExample+' .alert').addClass('alert-error fade in').show().html('<strong>Error</strong>: Undefined error!');
  }


}



function parseText ( selectorText, _dest )
{
  var _end = {'state':'not_begun', 'message':'Parsing not begun.'};
  var _origen = $(selectorText).val().trim();

  // Fixes #2
  _origen += '\n\n';
  if ( PARSE_DEBUG ) {
    console.debug ('Texto a parsear: ' + _origen );
  }
  switch (jQuery.type(_origen)) {
    case 'undefined':
        _end.state = 'error';
        _end.message = selectorText + ' is undefined.' ;
      break;
    case 'null':
        _end.state = 'error';
        _end.message = selectorText + ' is null.';
      break;
    case 'string':
      if (_origen.length > 0) {
        var _mensaje;
        try {
          _mensaje = peg_parser.parse (_origen );
        } catch (e) {
          if (e instanceof SyntaxError) {
            if ( PARSE_DEBUG ) {
              console.error ('SyntaxError exception: ' + _mensaje.message );
            }
            throw 'SyntaxError exception: ' + _mensaje.message;
          } else {
            if ( PARSE_DEBUG ) {
              console.error ('Unknown exception: ' + e );
            }
            throw 'Unknown exception: ' + e;
          }
        }
        if ( _mensaje.name !== 'SyntaxError' ) {
          if ( PARSE_DEBUG ) {
            var _texto = 'Titulo: "' + _mensaje[0].Title+ '"\n\nComentario: "' + _mensaje[0].Comment+ '"\n\nPregunta: "'+ _mensaje[0].Text.Question+ '"\n\nRespuesta: "' + _mensaje[0].Text.Answer + '"';
          // Mostramos la primera pregunta para asegurarnos que está todo bien
            $('#test_destination' ).text( _texto );
            _end.message = 'Converting (' + selectorText + ') ' + _origen + '" to "' + _texto + '"';
          } else {
            _end.message = 'Correct parsing &nbsp;&nbsp;&nbsp;&nbsp;';
          }
          _end.state = 'success';
          // Creamos las preguntas como elementos
          render_questions ( _mensaje, _dest );
        } else {
          _end.state = 'error';
          _end.message = _mensaje.message;
        }
      } else {
        _end.state = 'warning';
        _end.message = selectorText + ' has 0 length.';
      }
      break;
    default:
      _end.state = 'error';
      _end.message = selectorText + ' is ' + jQuery.type(_origen);
  }

  switch (_end.state) {
    case 'success':
      if ( PARSE_DEBUG ) {      console.info ( _end.message );    }
      $.bootstrapGrowl( '<strong>Success</strong>: ' + _end.message, {
        type: 'info',
        align: 'center',
        width: 'auto',
        delay: GROWL_DELAY
      } );
      break;
    case 'warning':
      if ( PARSE_DEBUG ) {      console.warn ( _end.message );    }
      $.bootstrapGrowl( '<strong>Warning</strong>: ' + _end.message, {
        type: 'danger',
        align: 'center',
        width: 'auto',
        delay: GROWL_DELAY
      } );
      break;
    case 'error':
    if ( PARSE_DEBUG ) {      console.error ( _end.message );    }
      $.bootstrapGrowl( '<strong>Error</strong>: ' + _end.message, {
        type: 'danger',
        align: 'center',
        width: 'auto',
        delay: GROWL_DELAY
      } );
      break;
    case 'not_begun':
    if ( PARSE_DEBUG ) {      console.error ( _end.message );    }
      $.bootstrapGrowl( '<strong>Error/Not begun</strong>: ' +  _end.message, {
        type: 'danger',
        align: 'center',
        width: 'auto',
        delay: GROWL_DELAY
      } );
      break;
    default:
    if ( PARSE_DEBUG ) {      console.error ( 'Undefined error!' );    }
      $.bootstrapGrowl( '<strong>Error</strong>: Undefined error!', {
        type: 'danger',
        align: 'center',
        width: 'auto',
        delay: GROWL_DELAY
      } );
  }
}


function render_questions ( _qs, _dest )
{
  if ( _dest === undefined ) {
  _dest = '#accordion1';
  }

  for ( var x in _qs ) {
    if ( PARSE_DEBUG ) {    console.log ( 'Rendering ('+x+'): ' + _qs[x].Title );    }
    var q_detected = detect_question_type ( _qs[x] );
    switch (q_detected.type) {
      case 'description':
          if ( PARSE_DEBUG ) {  console.log ('*** Description: ' + _qs[x].Title + '/' + _qs[x].Text.Question  );    }
          $(_dest).append ( render_description ( _qs[x], q_detected ) );
        break;
      case 'essay':
          if ( PARSE_DEBUG ) {  console.log ('*** Essay: ' + _qs[x].Title + '/' + _qs[x].Text.Question  );    }
          $(_dest).append ( render_essay ( _qs[x], q_detected ) );
        break;
      case 'true-false':
          if ( PARSE_DEBUG ) {  console.log ('*** (' + q_detected.answer[0] + '): ' + _qs[x].Title + '/' + _qs[x].Text.Question );    }
          $(_dest).append ( render_true_false ( _qs[x], q_detected ) );
        break;
      case 'numeric-tolerance':
          if ( PARSE_DEBUG ) {  console.log ('*** Tolerance: ' + _qs[x].Title + '/' + _qs[x].Text.Question + ' = ' + q_detected.answer[0] + '+-' + q_detected.answer[1] ); }
          $(_dest).append ( render_numeric ( _qs[x], q_detected ) );
        break;
      case 'numeric-range':
          if ( PARSE_DEBUG ) {  console.log ('*** Range: ' + _qs[x].Title + '/' + _qs[x].Text.Question + ' = ' + q_detected.answer[0] + ' to ' + q_detected.answer[1] ); }
          $(_dest).append ( render_numeric ( _qs[x], q_detected ) );
        break;
      case 'matching':
          if ( PARSE_DEBUG ) {  console.log ('*** Matching: ' + _qs[x].Title + '/' + _qs[x].Text.Question + ' = ' + JSON.stringify ( q_detected.answer) ) ; }
          $(_dest).append ( render_matching ( _qs[x], q_detected ) );
        break;
      case 'start-fill-blank':
      case 'inline-fill-blank':
      case 'end-fill-blank':
          if ( PARSE_DEBUG ) {  console.log ('*** Fill-blank: ' + _qs[x].Title + '/' + JSON.stringify (_qs[x].Text.Question) + ' = ' + JSON.stringify ( q_detected.answer) ) ; }
          $(_dest).append ( render_fill_blank ( _qs[x], q_detected ) );
        break;
      default:
          if ( PARSE_DEBUG ) {  console.log ( '¿Type? ' + JSON.stringify ( q_detected ) ); }
          // TODO: show error or something
    }
  }
  $( _dest ).accordion( 'refresh' );
}


function detect_question_type ( _q )
{
  var _detected = false;

  var _answer = _q.Text.Answer;
  var _result = {type:'unknown', answer: [] };

  // First, the easiest comparison, start-fill-blank or inline-fill-blank
  if ( _q.Text.Question && _q.Text.Question instanceof Array ) {
    if ( _q.Text.Question[0] === '' ) {
      _detected = true;
      _result.type = 'start-fill-blank';
      _result.answer = _q.Text.Answer.slice(1,-1).trim().slice(1).split( '=' );
      // console.debug ( 'DETECTED START: ' + JSON.stringify (_result.answer) + ' ' + _q.Text.Question[1] );
    } else {
      _detected = true;
      _result.type = 'inline-fill-blank';
      _result.answer = _q.Text.Answer.slice(1,-1).trim().slice(1).split( '=' );
      // console.debug ( 'DETECTED INLINE: ' + _q.Text.Question[0] + JSON.stringify (_result.answer) + ' ' + _q.Text.Question[1] );
    }
  } else {
    // console.debug ( '¿QUESTION? ' + _q.Text.Question );
    // questions_global.push (_q.Text.Question);
    // Then the simple and similar comparisons
    switch ( _answer  ) {
      case '':
          _result.type = 'description';
          _detected = true;
        break;
      case '{}':
          _result.type = 'essay';
          _detected = true;
        break;
      case '{T}':
      case '{F}':
          _result.type = 'true-false';
          _result.answer[0] = _answer.slice(1,-1);
          _detected = true;
        break;
    }
  }

  if ( ! _detected ) {
    // Si no es una respuesta simple, eliminamos los '{' y '}' inicial y final para seguir parseando
    _answer = _q.Text.Answer.slice(1,-1).trim();
    if ( _answer.charAt(0) == '#') {
      // TODO: Detectar mediante
      //    ::Q7:: When was Ulysses S. Grant born? {#
      //    =1822:0      # Correct! Full credit.
      //    =%50%1822:2  # He was born in 1822. Half credit for being close.
      var _split_answer = _answer.split(':');
      if ( _split_answer.length == 2 ) {
        _result.answer[0] = _split_answer[0].slice(1);
        _result.answer[1] = _split_answer[1];
        _result.type = 'numeric-tolerance';
        _detected = true;
      } else {
        _split_answer = _answer.split('..');
        _result.answer[0] = _split_answer[0].slice(1);
        _result.answer[1] = _split_answer[1];
        _result.type = 'numeric-range';
        _detected = true;
      }
    } else {
      // Los únicos tipos que nos quedan por detectar serían start-fill-blank, end-fill-blank y matching
      var _match_separated = _answer.match (/->/gm);
      if ( _match_separated && _match_separated.length >= 3 ) {
        // Para considerarse Matching, debe haber por lo menos 3 opciones (->)
        // Eliminamos el = primero para poder separar la respuesta mediante el resto de =
        _result.answer = _answer.slice(1).split( '=' );
        _result.type = 'matching';
        _detected = true;
      } else {
        // TODO: Fill blank final o ¿hay alguna más?
        _result.answer = _answer.slice(1).split( '=' );
        _result.type = 'end-fill-blank';
        _detected = true;
        // console.debug ( '+++ END FILL BLANK - ' + JSON.stringify ( _q.Text.Question ) );
      }
    }
  }

  return _result;
}


function render_description ( _q, _d )
{
  if ( PARSE_DEBUG ) {
    console.log ( '--- Rendering description' );
  }

  var _rendered_question = {
    type: 'Descripción',
    title: _q.Title,
    html: '' };

  _rendered_question.html = '<form class="form-inline" role="form">';

  _rendered_question.html += '<div class="form-group form-group-sm">';
  _rendered_question.html +=  '<p class="form-control-static">' + _q.Text.Question + '</p><br/>';
  _rendered_question.html += '</div>';

  _rendered_question.html += '</form>';

  return new_accordion_question ( _rendered_question );
}


function render_essay ( _q, _d )
{
  if ( PARSE_DEBUG ) {
    console.log ( '--- Rendering essay' );
  }

  var _rendered_question = {
    type: 'Redacción',
    title: _q.Title,
    html: '' };

  _rendered_question.html = '<form class="form-inline" role="form">';

  _rendered_question.html += '<div class="form-group form-group-sm">';
  _rendered_question.html +=  '<p class="form-control-static">' + _q.Text.Question + '</p><br/>';
  _rendered_question.html +=  '<textarea class="form-control" rows="5" disabled></textarea>';
  _rendered_question.html += '</div>';

  _rendered_question.html += '</form>';

  return new_accordion_question ( _rendered_question );
}



function render_true_false ( _q, _d )
{
  if ( PARSE_DEBUG ) {
    console.log ( '--- Rendering true/false' );
  }

  var _rendered_question = {
    type: 'Verdadero/Falso',
    title: _q.Title,
    html: '' };

  _rendered_question.html = '<form class="form-inline" role="form">';

  _rendered_question.html += '<div class="form-group form-group-sm">';
  _rendered_question.html +=  '<p class="form-control-static">' + _q.Text.Question + '</p><br/>';
  _rendered_question.html +=  '<div class="radio">';
  _rendered_question.html +=   '<input type="radio" name="optradio1"' + ((_d.answer=='T')?' checked="checked"':'') + '>';
  _rendered_question.html +=   '<label class="control-label" for="optradio1">Verdadero</label>';
  _rendered_question.html +=   '<br/>';
  _rendered_question.html +=   '<input type="radio" name="optradio2"' + ((_d.answer=='F')?' checked="checked"':'') + '>';
  _rendered_question.html +=   '<label class="control-label" for="optradio2">Falso</label>';
  _rendered_question.html +=  '</div>';
  _rendered_question.html += '</div>';

  _rendered_question.html += '</form>';

  return new_accordion_question ( _rendered_question );
}



function render_numeric ( _q, _d )
{
  if ( PARSE_DEBUG ) {
    console.log ( '--- Rendering numeric ' + _d.type );
  }

  var _rendered_question = {
    type: ( ( _d.type == 'numeric-tolerance')?'Tolerancia numérica':'Rango numérico'),
    title: _q.Title,
    html: '' };

  _rendered_question.html = '<form class="form-inline" role="form">';

  _rendered_question.html += '<div class="form-group form-group-sm">';
  _rendered_question.html +=  '<p class="form-control-static">' + _q.Text.Question + '</p><br/>';
  _rendered_question.html +=  '<label class="control-label" for="first">';
  _rendered_question.html +=  ( _d.type == 'numeric-tolerance')?'':'Desde';
  _rendered_question.html +=  '</label>';
  _rendered_question.html +=  '<input class="form-control" type="number" id="first" value="' + _d.answer[0] + '"/>';
  _rendered_question.html +=  '<label class="control-label" for="second">';
  _rendered_question.html +=  ( _d.type == 'numeric-tolerance')?'con una toleracia de':'hasta';
  _rendered_question.html +=  '</label>';
  _rendered_question.html +=  '<input class="form-control" type="number" id="second" value="' + _d.answer[1] + '"/>';
  _rendered_question.html += '</div>';

  _rendered_question.html += '</form>';

  return new_accordion_question ( _rendered_question );
}


function render_matching ( _q, _d )
{
  if ( PARSE_DEBUG ) {
    console.log ( '--- Rendering matching' );
  }

  var _rendered_question = {
    type: 'Emparejar',
    title: _q.Title,
    html: '' };

  _rendered_question.html = '<form class="form-inline" role="form">';
  _rendered_question.html += '<div class="form-group form-group-sm">';
  _rendered_question.html +=  '<p class="form-control-static">' + _q.Text.Question + '</p><br/>';

  var _split_pair;
  for ( var _pair in _d.answer ) {
    _split_pair = _d.answer[_pair].split('->');
    _rendered_question.html +=  '<input class="form-control" type="text" value="' + $.trim( _split_pair[0] ) + '"/>';
    _rendered_question.html +=  '<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>';
    _rendered_question.html +=  '<input class="form-control" type="text" value="' + $.trim( _split_pair[1] ) + '"/>';
    _rendered_question.html +=  '<hr/>';
  }
  _rendered_question.html += '</div>';
  _rendered_question.html += '</form>';

  return new_accordion_question ( _rendered_question );
}


function render_fill_blank ( _q, _d )
{
  if ( PARSE_DEBUG ) {
    console.log ( '--- Rendering fill blank - ' + JSON.stringify ( _q.Text.Question ) );
  }

  var _rendered_question = {
    type: 'Hueco',
    title: _q.Title,
    html: '' };

  _rendered_question.html = '<form class="form-inline" role="form">';
  _rendered_question.html += '<div class="form-group form-group-sm">';

  // console.debug ( '+++ ' +  _d.type + ' - ' + JSON.stringify ( _q.Text.Question ) );

  switch ( _d.type ) {
  case 'start-fill-blank':
    for ( var _x in _d.answer ) {
      // console.debug ( 'START: ' + _d.answer[_x] + ' ' + _q.Text.Question[1] );
      _rendered_question.html +=  '<input class="form-control" type="text" value="' + _d.answer[_x] + '"/>';
    }
    _rendered_question.html +=  '<span class="form-control-static">' + _q.Text.Question[1] + '</span>';
    break;
  case 'inline-fill-blank':
    _rendered_question.html +=  '<span class="form-control-static">' + _q.Text.Question[0] + '</span>';
    for ( var _x in _d.answer ) {
      // console.debug ( 'INLINE ' + _q.Text.Question[0] + _d.answer[_x] + ' ' + _q.Text.Question[1] );
      _rendered_question.html +=  '<input class="form-control" type="text" value="' + _d.answer[_x] + '"/>';
    }
    _rendered_question.html +=  '<span class="form-control-static">' + _q.Text.Question[1] + '</span>';
    break;
  case 'end-fill-blank':
    _rendered_question.html +=  '<span class="form-control-static">' + _q.Text.Question + '</span>';
    for ( var _x in _d.answer ) {
      // console.debug ( 'END: ' + _q.Text.Question + ' ' + _d.answer[_x] );
      _rendered_question.html +=  '<input class="form-control" type="text" value="' + _d.answer[_x] + '"/>';
    }
    break;

    default:

  }

  _rendered_question.html += '</div>';
  _rendered_question.html += '</form>';

  return new_accordion_question ( _rendered_question );
}


function new_accordion_question ( _rq )
{
  var _new_question = $('<div class="group"><div class="acc_title"><span>' +  _rq.title + '</span><span class="pull-right label label-default">'+ _rq.type + '</span></div><div>' + _rq.html + '</div></div>' );

  return _new_question;
}
