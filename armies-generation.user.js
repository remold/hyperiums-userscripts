// ==UserScript==
// @name        Armies Generation Avg
// @namespace   http://github.com/Nasga/hyperiums-greasemonkey/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @include    http://hyp2.hyperiums.com/servlet/Fleets?pagetype=factories
// @version     12
// @grant       none
// ==/UserScript==

/* global $:false */

"use strict";


var GaGenSum = 0;
var planets = 0;
var race = {
  human: {
    sum:0,
    avg:0,
    planets:0
  },
  azterk: {
    sum:0,
    avg:0,
    planets:0
  },
  xillor: {
    sum:0,
    avg:0,
    planets:0
  }
};
var spans = $( "span" );
$('body')
  .find("TD:contains('- Human -') SPAN.highlight")
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
    .find("TD:contains('- Azterk -') SPAN.highlight")
    .each(function(idx, elt) {
      GaGenSum += parseInt($(elt).text());
      planets++;
      race.azterk.planets ++;
      race.azterk.sum += parseInt($(elt).text());
    }
);
$('body')
  .find("TD:contains('- Xillor -') SPAN.highlight")
  .each(function(idx, elt) {
    GaGenSum += parseInt($(elt).text());
    planets++;
    race.xillor.planets ++;
    race.xillor.sum += parseInt($(elt).text());
  }
);

if (race.human.sum > 0) {
  race.human.avg = Math.round((race.human.sum / race.human.planets)*10)/10;
}

if (race.azterk.sum > 0) {
  race.azterk.avg = Math.round((race.azterk.sum / race.azterk.planets)*10)/10;
}

if (race.xillor.sum > 0) {
  race.xillor.avg = Math.round((race.xillor.sum / race.xillor.planets)*10)/10;
}

$('body center')
  .append(
    '<div class="banner" ' +
    'style="text-align: left; width: 580px;" ' +
    '>' +
    'GA Gen Sum : <strong>'+ GaGenSum + '</strong> (' +
    ' H:<i>' + race.human.sum +
    '</i> | A:<i>' + race.azterk.sum +
    '</i> | X:<i>' + race.xillor.sum +
    '</i> )' +
    '<br /> GA gen Avg : ' +
    '<strong>' + Math.round((GaGenSum / planets)*10)/10 + '</strong> (' +
    ' H:<i>' + race.human.avg  +
    '</i> | A:<i>' + race.azterk.avg +
    '</i> | X:<i>' + race.xillor.avg +
    '</i> )'  +
    '</div>' +
    '<br />' +
    '<br />' +
    '<br />'
  );

