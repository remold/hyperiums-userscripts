// ==UserScript==
// @name        Armies Generation Avg
// @namespace   http://github.com/remold/hyperiums-greasemonkey/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @include    http://hyp2.hyperiums.com/servlet/Fleets?pagetype=factories
// @version     21
// @grant       none
// @copyright   2013+, Remold Krol (https://github.com/remold)
// @license     Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
// @author      Remold Krol
// @homepage    https://github.com/remold

// ==/UserScript==

/* global $:false */

"use strict";


var GaGenSum = 0;
var planets = 0;
var race = {
  human: {
    sum:0,
    planets:0
  },
  azterk: {
    sum:0,
    planets:0
  },
  xillor: {
    sum:0,
    planets:0
  }
};
var spans = $( "span" );
$('body')
  .find("TD:contains('Human -') SPAN.highlight, " +
        "TD:contains('Humain -') SPAN.highlight, " +
        "TD:contains('Menschen -') SPAN.highlight, " +
        "TD:contains('Mensen -') SPAN.highlight")
  .each(function(idx, elt) {
    GaGenSum += parseFloat($(elt).text());
    planets++;
    race.human.planets ++;
    race.human.sum += parseFloat($(elt).text());
  }
);

// filter(function(){ return $(this).text().toLowerCase() === 'test';})
var Aobjs=
$('body')
    .find("TD:contains('Azterk -') SPAN.highlight")
    .each(function(idx, elt) {
      GaGenSum += Math.round(parseFloat($(elt).text())*10)/10;
      planets++;
      race.azterk.planets ++;
      race.azterk.sum += Math.round(parseFloat($(elt).text())*10)/10;
    }
);
$('body')
  .find("TD:contains('Xillor -') SPAN.highlight")
  .each(function(idx, elt) {
    GaGenSum += parseFloat($(elt).text());
    planets++;
    race.xillor.planets ++;
    race.xillor.sum += Math.round(parseFloat($(elt).text())*10)/10;
  }
);

$('body center')
  .append(
    '<div class="banner" ' +
    'style="text-align: left; width: 580px;" ' +
    '>' +
    'GA Gen Sum : <strong>'+  Math.round(GaGenSum*10)/10  + '</strong> (' +
    ' H:<i>' + Math.round(race.human.sum*10)/10 +
    '</i> | A:<i>' + Math.round(race.azterk.sum*10)/10 +
    '</i> | X:<i>' + Math.round(race.xillor.sum*10)/10 +
    '</i> )' +
    '<br /> GA gen Avg : ' +
    '<strong>' + Math.round((GaGenSum / planets)*10)/10 + '</strong> (' +
    ' H:<i>' + Math.round((race.human.sum / race.human.planets) *10)/10  +
    '</i> | A:<i>' + Math.round((race.azterk.sum / race.azterk.planets) *10)/10 +
    '</i> | X:<i>' + Math.round((race.xillor.sum / race.xillor.planets)*10)/10 +
    '</i> )'  +
    '</div>' +
    '<br />' +
    '<br />' +
    '<br />'
  );

