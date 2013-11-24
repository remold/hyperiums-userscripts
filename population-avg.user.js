// ==UserScript==
// @name        Population Avg
// @namespace   http://github.com/Nasga/hyperiums-greasemonkey/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @include    http://hyp2.hyperiums.com/servlet/Home
// @version     3
// @grant       none
// ==/UserScript==

/* global $:false */

"use strict";

if (!$('.tabbertab').length) {
  var populationSum = 0;
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
  $('body')
    .find('img[src*="/misc/pop_icon_Human"]')
    .parent('td')
    .parent('tr')
    .find('td:eq(1) span:eq(1)')
    .each(function(idx, elt) {
      populationSum += parseInt($(elt).text());
      planets++;
      race.human.planets ++;
      race.human.sum += parseInt($(elt).text());
    }
  );
  $('body')
    .find('img[src*="/misc/pop_icon_Azterk"]')
    .parent('td')
    .parent('tr')
    .find('td:eq(1) span:eq(1)')
    .each(function(idx, elt) {
      populationSum += parseInt($(elt).text());
      planets++;
      race.azterk.planets ++;
      race.azterk.sum += parseInt($(elt).text());
    }
  );
  $('body')
    .find('img[src*="/misc/pop_icon_Xillor"]')
    .parent('td')
    .parent('tr')
    .find('td:eq(1) span:eq(1)')
    .each(function(idx, elt) {
      populationSum += parseInt($(elt).text());
      planets++;
      race.xillor.planets ++;
      race.xillor.sum += parseInt($(elt).text());
    }
  );

  if (race.human.sum > 0) {
    race.human.avg = Math.round(race.human.sum / race.human.planets);
  }

  if (race.azterk.sum > 0) {
    race.azterk.avg = Math.round(race.azterk.sum / race.azterk.planets);
  }

  if (race.xillor.sum > 0) {
    race.xillor.avg = Math.round(race.xillor.sum / race.xillor.planets);
  }

  $('body div.tinytext:last')
    .after(
      '<div class="banner" ' +
      'style="text-align: left; width: 580px;" ' +
      '>' +
      'Pop Sum : <strong>'+ populationSum + '</strong> (' +
      ' H:<i>' + race.human.sum +
      '</i> | A:<i>' + race.azterk.sum +
      '</i> | X:<i>' + race.xillor.sum +
      '</i> )' +
      '<br /> Pop Avg : ' +
      '<strong>' + Math.round(populationSum / planets) + '</strong> (' +
      ' H:<i>' + race.human.avg  +
      '</i> | A:<i>' + race.azterk.avg +
      '</i> | X:<i>' + race.xillor.avg +
      '</i> )'  +
      '</div>' +
      '<br />'
    );
}

$('.tabbertab').each(
  function(tabidx, tab) {
  "use strict";
  var populationSum = 0;
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

  var growSum = 0;
  $(tab)
    .find('img[src*="/misc/pop_icon_Human"]')
    .parent('td')
    .parent('tr')
    .find('td:eq(1) span:eq(1)')
    .each(function(idx, elt) {
      populationSum += parseInt($(elt).text());
      planets++;
      race.human.planets ++;
      race.human.sum += parseInt($(elt).text());
    }
  );
  $(tab)
    .find('img[src*="/misc/pop_icon_Azterk"]')
    .parent('td')
    .parent('tr')
    .find('td:eq(1) span:eq(1)')
    .each(function(idx, elt) {
      populationSum += parseInt($(elt).text());
      planets++;
      race.azterk.planets ++;
      race.azterk.sum += parseInt($(elt).text());
    }
  );
  $(tab)
    .find('img[src*="/misc/pop_icon_Xillor"]')
    .parent('td')
    .parent('tr')
    .find('td:eq(1) span:eq(1)')
    .each(function(idx, elt) {
      populationSum += parseInt($(elt).text());
      planets++;
      race.xillor.planets ++;
      race.xillor.sum += parseInt($(elt).text());
    }
  );

  if (race.human.sum > 0) {
    race.human.avg = Math.round(race.human.sum / race.human.planets);
  }

  if (race.azterk.sum > 0) {
    race.azterk.avg = Math.round(race.azterk.sum / race.azterk.planets);
  }

  if (race.xillor.sum > 0) {
    race.xillor.avg = Math.round(race.xillor.sum / race.xillor.planets);
  }

  $(tab)
    .append(
      '<div class="banner" ' +
      'style="text-align: left; width: 580px;" ' +
      '>' +
      'Pop Sum : <strong>'+ populationSum + '</strong> (' +
      ' H:<i>' + race.human.sum +
      '</i> | A:<i>' + race.azterk.sum +
      '</i> | X:<i>' + race.xillor.sum +
      '</i> )' +
      '<br /> Pop Avg : ' +
      '<strong>' + Math.round(populationSum / planets) + '</strong> (' +
      ' H:<i>' + race.human.avg  +
      '</i> | A:<i>' + race.azterk.avg +
      '</i> | X:<i>' + race.xillor.avg +
      '</i> )'  +
      '</div>' +
      '<br />'
    );
});
