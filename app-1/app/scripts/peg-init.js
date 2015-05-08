/*jslint node: true */
/*jslint multistr: true */
"use strict";

var texto_inicial = "// Comentario \n::T4::Q1\n\n\n";

var mensaje = peg_parser.parse(texto_inicial);

document.addEventListener('DOMContentLoaded', function() {
  var texto = document.getElementById('text1');
    texto.innerText = texto_inicial;

  var resultado = document.getElementById('text2');
  resultado.innerText = "Titulo: " + mensaje[0].Title+ "\nComentario: " + mensaje[0].Comment+ "\nPregunta: "+ mensaje[0].Text.Question+ "\nRespuesta: " + mensaje[0].Text.Answer;


  console.debug (mensaje[0]);

  console.debug (resultado);

  
}, false);



