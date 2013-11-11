// ==UserScript==
// @name Upkeep percent          
// @namespace https://github.com/Nasga/hyperiums-greasemonkey
// @include http://hyp2.hyperiums.com/servlet/Cash*
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// ==/UserScript==

/*global $:false */

"use strict";

var ti = $("td:contains('Total income from controlled planets')")
  .next("td")
  .text();

var upkeep = $("td:contains('armies upkeep cost')")
  .next('td')
  .text();

if (upkeep) {
  ti = parseInt(
    ti.replace(/,/g,'')
  );
  upkeep = parseInt(
    upkeep.replace(/,/g,'')
      .replace('-','')
  );

  var percent = Math.round(upkeep / ti * 1000) / 10;

  $("td:contains('armies upkeep cost')")
    .append(" (" + percent + "%)");
}
