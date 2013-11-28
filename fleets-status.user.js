// ==UserScript==
// @name        Fleets Status
// @namespace   http://github.com/Nasga/hyperiums-greasemonkey/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @include     http://hyp2.hyperiums.com/servlet/Fleets*
// @version     1
// @grant       none
// ==/UserScript==

/*global $:false */

"use strict";

$("a:contains('Send status')")
  .parents('center:first')
  .append(
    '<div class="banner" ' +
    'style="text-align: left; margin-left: 90px; display:none; width: 580px;" ' +
    'id="SendStatusContent" ' +
    '>' +
    '</div>' +
    '<br />'
  );

function addAvgP (avgp1, avgp2) {
  return intToAvgp(avgpToInt(avgp1) + avgpToInt(avgp2));
}

function avgpToInt (avgp) {
  if (avgp.indexOf('K') > 0) {
    avgp.replace('K','');

    return parseFloat(avgp) * 1000;
  }
  if (avgp.indexOf('M') > 0) {
    avgp.replace('M','');

    return parseFloat(avgp) * 1000000;
  }
  if (avgp.indexOf('B') > 0) {
    avgp.replace('B','');

    return parseFloat(avgp) * 1000000000;
  }
  return parseFloat(avgp);
}

function intToAvgp (avgp) {
  avgp = parseInt(avgp);

  if (avgp > 1000000000) {
    return Math.round(avgp / 1000000000) + 'B';
  }

  if (avgp > 1000000) {
    return Math.round(avgp / 1000000) + 'M';
  }

  if (avgp > 1000) {
    return Math.round(avgp / 1000) + 'K';
  }

  return Math.round(avgp) + '';
}

$('.tabbertab > table').each(function(obj) {
  var planet = {};
  planet.id = $('a.planetName', this).attr('href').split('=')[1];
  planet.name = $('.planetName', this).text();
  planet.coords = $('.planetName', this).parent('td').text().replace(planet.name, '');
  planet.fleets = {
    own: "0",
    nmy: "0"
  };
  planet.fleets.own = $("td:contains('Space AvgP')[width=130]", this).parent('tr').find('td.vb').text();
  planet.fleets.nmy = $("td:contains('Enemy space AvgP')[width=130]", this).parent('tr').find('td:last').text();

  if (planet.fleets.nmy === '') {
    return true;
  }


  if (planet.fleets.own.indexOf('+') > 0) {
    var own = planet.fleets.own.split('+');
    var friendly = "0";
    if (own.length > 0) {
      own = addAvgP(
        own[0],
        own[1]
      );
    }
    planet.fleets.own = own;
  }

  planet.fleets.battle = $("td.flagBattle", this).text();
  if (planet.fleets.battle === 'Attacking') {
    planet.fleets.battle = 'Att';
  } else {
    planet.fleets.battle = 'Def';
  }

  planet.stasis = $("td.flagStasis", this).text();
  planet.nrj = $("table.energy td:last", this).text();
  
  $('#SendStatusContent')
    .append(
      '[' + planet.fleets.battle + '] ' +
      planet.coords +
      ' ' +
      planet.name +
      ' F:' +
      planet.fleets.own +
      ' E:' +
      planet.fleets.nmy +
      ' (' + planet.stasis + ' ' + planet.nrj + ') ' +
      '<br />'
    )
    .show();
});

