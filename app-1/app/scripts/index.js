/*jslint node: true */
"use strict";
document.addEventListener('DOMContentLoaded', function() {
  var h1 = document.getElementsByTagName('h3');
  if (h1.length > 0) {
    h1[0].innerText = h1[0].innerText + ' \...';
  }
}, false);
