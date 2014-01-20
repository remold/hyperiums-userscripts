// ==UserScript==
// @name        Population Avg
// @namespace   http://github.com/remold/hyperiums-greasemonkey/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @include     http://hyp2.hyperiums.com/servlet/Home
// @version     35
// @grant       none
// @copyright   2013+, Remold Krol (https://github.com/remold)
// @license     Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
// @author      Remold Krol
// @homepage    https://github.com/remold
// ==/UserScript==

/* global $:false */

"use strict";

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(".td_right { text-align: right ! important; } .th_right { text-align: right ! important; }");

if (!$('.tabbertab').length) {
  var populationSum = 0;
  var populationMax = 0;
  var populationMin = 9999999;
  var populationGrowth = 0;
  var planets = 0;
  var tmpPlanetPop = 0;
  var race = {
    human: {
      sum:0,
      max:0,
      min:9999999,
      avg:0,
      growth:0,
      planets:0
    },
    azterk: {
      sum:0,
      max:0,
      min:9999999,
      avg:0,
      growth:0,
      planets:0
    },
    xillor: {
      sum:0,
      max:0,
      min:9999999,
      avg:0,
      growth:0,
      planets:0
    }
  };
  $('body')
    .find('img[src*="/misc/pop_icon_Human"]')
    .parent('td')
    .parent('tr')
    .find('td:eq(1) span:eq(1)')
    .each(function(idx, elt) {
      tmpPlanetPop = parseInt($(elt).text());
      populationSum += tmpPlanetPop;
      planets++;
      race.human.planets ++;
      race.human.sum += tmpPlanetPop;
      if (tmpPlanetPop > race.human.max) {
          race.human.max = tmpPlanetPop;
      }
      if (tmpPlanetPop < race.human.min) {
          race.human.min = tmpPlanetPop;
      }
      if (tmpPlanetPop > populationMax) {
          populationMax = tmpPlanetPop;
      }
      if (tmpPlanetPop < populationMin) {
          populationMin = tmpPlanetPop;
      }
    }
  );
  $('body')
    .find('img[src*="/misc/pop_icon_Azterk"]')
    .parent('td')
    .parent('tr')
    .find('td:eq(1) span:eq(1)')
    .each(function(idx, elt) {
      tmpPlanetPop = parseInt($(elt).text());
      populationSum += tmpPlanetPop;
      planets++;
      race.azterk.planets ++;
      race.azterk.sum += tmpPlanetPop;
      if (tmpPlanetPop > race.azterk.max) {
        race.azterk.max = tmpPlanetPop;
      }
      if (tmpPlanetPop < race.azterk.min) {
        race.azterk.min = tmpPlanetPop;
      }
      if (tmpPlanetPop > populationMax) {
          populationMax = tmpPlanetPop;
      }
      if (tmpPlanetPop < populationMin) {
          populationMin = tmpPlanetPop;
      }
    }
  );
  $('body')
    .find('img[src*="/misc/pop_icon_Xillor"]')
    .parent('td')
    .parent('tr')
    .find('td:eq(1) span:eq(1)')
    .each(function(idx, elt) {
      tmpPlanetPop = parseInt($(elt).text());
      populationSum +=tmpPlanetPop;
      planets++;
      race.xillor.planets ++;
      race.xillor.sum += tmpPlanetPop;
      if (tmpPlanetPop > race.xillor.max) {
        race.xillor.max = tmpPlanetPop;
      }
      if (tmpPlanetPop < race.xillor.min) {
        race.xillor.min = tmpPlanetPop;
      }
      if (tmpPlanetPop > populationMax) {
          populationMax = tmpPlanetPop;
      }
      if (tmpPlanetPop < populationMin) {
          populationMin = tmpPlanetPop;
      }
    }
  );

  // Growth
    var tmpGrowthStr = "";
    var tmpGrowthText = "";
    var tmpGrowth = 0;
    $('body')
      .find('img[src*="/misc/pop_icon_Human"]')
      .each(function(idx, elt) {
        tmpGrowthStr = $(elt).attr("onmouseover");
        tmpGrowth= parseInt(tmpGrowthStr.substring(tmpGrowthStr.indexOf(":")+2,tmpGrowthStr.indexOf("/")-1));
        populationGrowth += tmpGrowth;
        race.human.growth += tmpGrowth;
        tmpGrowthText = tmpGrowthStr.substring(tmpGrowthStr.indexOf("'")+1,tmpGrowthStr.lastIndexOf("'")-3);
        $(elt).parent('td').parent().find("td:last-child").append("<BR>" + tmpGrowthText );
      }
    )
    $('body')
      .find('img[src*="/misc/pop_icon_Azterk"]')
      .each(function(idx, elt) {
        tmpGrowthStr = $(elt).attr("onmouseover");
        tmpGrowth= parseInt(tmpGrowthStr.substring(tmpGrowthStr.indexOf(":")+2,tmpGrowthStr.indexOf("/")-1));
        populationGrowth += tmpGrowth;
        race.azterk.growth += tmpGrowth;
        tmpGrowthText = tmpGrowthStr.substring(tmpGrowthStr.indexOf("'")+1,tmpGrowthStr.lastIndexOf("'")-3);
        $(elt).parent('td').parent().find("td:last-child").append("<BR>" + tmpGrowthText );
      }
    )
    $('body')
      .find('img[src*="/misc/pop_icon_Xillor"]')
      .each(function(idx, elt) {
        tmpGrowthStr = $(elt).attr("onmouseover");
        tmpGrowth= parseInt(tmpGrowthStr.substring(tmpGrowthStr.indexOf(":")+2,tmpGrowthStr.indexOf("/")-1));
        populationGrowth += tmpGrowth;
        race.xillor.growth += tmpGrowth;
        tmpGrowthText = tmpGrowthStr.substring(tmpGrowthStr.indexOf("'")+1,tmpGrowthStr.lastIndexOf("'")-3);
        $(elt).parent('td').parent().find("td:last-child").append("<BR>" + tmpGrowthText );
      }
    )

  if (race.human.sum > 0) {
    race.human.avg = Math.round(race.human.sum / race.human.planets);
  }

  if (race.azterk.sum > 0) {
    race.azterk.avg = Math.round(race.azterk.sum / race.azterk.planets);
  }

  if (race.xillor.sum > 0) {
    race.xillor.avg = Math.round(race.xillor.sum / race.xillor.planets);
  }

  if (race.human.sum == 0) { race.human.sum = " ." }
  if (race.azterk.sum == 0) { race.azterk.sum = " ." }
  if (race.xillor.sum == 0) { race.xillor.sum = " ."}
  if (race.human.max == 0) { race.human.max = " ." }
  if (race.azterk.max == 0) { race.azterk.max = " ." }
  if (race.xillor.max == 0) { race.xillor.max = " ."}
  if (race.human.avg == 0) { race.human.avg = " ." }
  if (race.azterk.avg == 0) { race.azterk.avg = " ." }
  if (race.xillor.avg == 0) { race.xillor.avg = " ."}
  if (race.human.min == 9999999) { race.human.min = " ." }
  if (race.azterk.min == 9999999) { race.azterk.min = " ." }
  if (race.xillor.min == 9999999) { race.xillor.min = " ."}
  if (race.human.growth == 0) { race.human.growth = " ." }
  if (race.azterk.growth == 0) { race.azterk.growth = " ." }
  if (race.xillor.growth == 0) { race.xillor.growth = " ."}

  $('body div.tinytext:last')
    .after(
          '<div class="banner" ' +
              'style="text-align: left; width: 580px;" ' +
              '>' +
              '<table border="0" width="100%">' +
              '<tr><th></th>' +
              '<th class="th_right"> Total</th>' +
              '<th class="th_right"> Human</th>' +
              '<th class="th_right"> Azterk</th>' +
              '<th class="th_right"> Xillor</th>' +
              '</tr>' +

              '<tr><td>Planet #</td>' +
              '<td class="td_right"><strong> '+ planets + '</strong></td>' +
              '<td class="td_right"> ' + race.human.planets + '</td>' +
              '<td class="td_right"> ' + race.azterk.planets + '</td>' +
              '<td class="td_right"> ' + race.xillor.planets + '</td></tr>' +

              '<tr><td>Population Sum</td>' +
              '<td class="td_right"><strong> '+ populationSum + '</strong></td>' +
              '<td class="td_right"> ' + race.human.sum + '</td>' +
              '<td class="td_right"> ' + race.azterk.sum + '</td>' +
              '<td class="td_right"> ' + race.xillor.sum + '</td></tr>' +

              '<tr><td>Population Max</td>' +
              '<td class="td_right"><strong> '+ populationMax + '</strong></td>' +
              '<td class="td_right"> ' + race.human.max + '</td>' +
              '<td class="td_right"> ' + race.azterk.max + '</td>' +
              '<td class="td_right"> ' + race.xillor.max + '</td></tr>' +

              '<tr><td>Population Avg</td>' +
              '<td class="td_right"><strong> '+ Math.round(populationSum / planets) + '</strong></td>' +
              '<td class="td_right"> ' + race.human.avg + '</td>' +
              '<td class="td_right"> ' + race.azterk.avg + '</td>' +
              '<td class="td_right"> ' + race.xillor.avg + '</td></tr>' +

              '<tr><td>Population Min</td>' +
              '<td class="td_right"><strong> '+ populationMin + '</strong></td>' +
              '<td class="td_right"> ' + race.human.min + '</td>' +
              '<td class="td_right"> ' + race.azterk.min + '</td>' +
              '<td class="td_right"> ' + race.xillor.min + '</td></tr>' +

              '<tr><td>Population Growth #</td>' +
              '<td class="td_right"><strong class="td_right"> '+ populationGrowth + '</strong></td>' +
              '<td class="td_right"> ' + race.human.growth + '</td>' +
              '<td class="td_right"> ' + race.azterk.growth + '</td>' +
              '<td class="td_right"> ' + race.xillor.growth + '</td></tr>' +

              '</table></div><br />'
    );
}

$('.tabbertab').each(
  function(tabidx, tab) {
  "use strict";
  var populationSum = 0;
  var populationMax = 0;
  var populationMin = 9999999;
  var populationGrowth = 0;
  var planets = 0;
  var tmpPlanetPop = 0;
  var race = {
    human: {
      sum:0,
      max:0,
      min:9999999,
      avg:0,
      growth:0,
      planets:0
    },
    azterk: {
      sum:0,
      max:0,
      min:9999999,
      avg:0,
      growth:0,
      planets:0
    },
    xillor: {
      sum:0,
      max:0,
      min:9999999,
      avg:0,
      growth:0,
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
      tmpPlanetPop = parseInt($(elt).text());
      populationSum += tmpPlanetPop;
      planets++;
      race.human.planets ++;
      race.human.sum += tmpPlanetPop;
      if (tmpPlanetPop > race.human.max) {
          race.human.max = tmpPlanetPop;
      }
      if (tmpPlanetPop < race.human.min) {
          race.human.min = tmpPlanetPop;
      }
      if (tmpPlanetPop > populationMax) {
          populationMax = tmpPlanetPop;
      }
      if (tmpPlanetPop < populationMin) {
          populationMin = tmpPlanetPop;
      }
    }
  );
  $(tab)
    .find('img[src*="/misc/pop_icon_Azterk"]')
    .parent('td')
    .parent('tr')
    .find('td:eq(1) span:eq(1)')
    .each(function(idx, elt) {
      tmpPlanetPop = parseInt($(elt).text());
      populationSum += tmpPlanetPop;
      planets++;
      race.azterk.planets ++;
      race.azterk.sum += tmpPlanetPop;
      if (tmpPlanetPop > race.azterk.max) {
          race.azterk.max = tmpPlanetPop;
      }
      if (tmpPlanetPop < race.azterk.min) {
          race.azterk.min = tmpPlanetPop;
      }
      if (tmpPlanetPop > populationMax) {
          populationMax = tmpPlanetPop;
      }
      if (tmpPlanetPop < populationMin) {
          populationMin = tmpPlanetPop;
      }
    }
  );
  $(tab)
    .find('img[src*="/misc/pop_icon_Xillor"]')
    .parent('td')
    .parent('tr')
    .find('td:eq(1) span:eq(1)')
    .each(function(idx, elt) {
      tmpPlanetPop = parseInt($(elt).text());
      populationSum +=tmpPlanetPop;
      planets++;
      race.xillor.planets ++;
      race.xillor.sum += tmpPlanetPop;
      if (tmpPlanetPop > race.xillor.max) {
          race.xillor.max = tmpPlanetPop;
      }
      if (tmpPlanetPop < race.xillor.min) {
          race.xillor.min = tmpPlanetPop;
      }
      if (tmpPlanetPop > populationMax) {
          populationMax = tmpPlanetPop;
      }
      if (tmpPlanetPop < populationMin) {
          populationMin = tmpPlanetPop;
      }
    }
  );

  $(tab)
    .find('img[src*="/misc/pop_icon_Human"]')
    .each(function(idx, elt) {
      tmpGrowthStr = $(elt).attr("onmouseover");
      tmpGrowth= parseInt(tmpGrowthStr.substring(tmpGrowthStr.indexOf(":")+2,tmpGrowthStr.indexOf("/")-1));
      populationGrowth += tmpGrowth;
      race.human.growth += tmpGrowth;
      tmpGrowthText = tmpGrowthStr.substring(tmpGrowthStr.indexOf("'")+1,tmpGrowthStr.lastIndexOf("'")-3);
      $(elt).parent('td').parent().find("td:last-child").append("<BR>" + tmpGrowthText );
    }
  )
	
  $(tab)
    .find('img[src*="/misc/pop_icon_Azterk"]')
	.each(function(idx, elt) {
      tmpGrowthStr = $(elt).attr("onmouseover");
      tmpGrowth= parseInt(tmpGrowthStr.substring(tmpGrowthStr.indexOf(":")+2,tmpGrowthStr.indexOf("/")-1));
      populationGrowth += tmpGrowth;
      race.azterk.growth += tmpGrowth;
      tmpGrowthText = tmpGrowthStr.substring(tmpGrowthStr.indexOf("'")+1,tmpGrowthStr.lastIndexOf("'")-3);
      $(elt).parent('td').parent().find("td:last-child").append("<BR>" + tmpGrowthText );
    }
  )
  $(tab)
    .find('img[src*="/misc/pop_icon_Xillor"]')
	.each(function(idx, elt) {
      tmpGrowthStr = $(elt).attr("onmouseover");
      tmpGrowth= parseInt(tmpGrowthStr.substring(tmpGrowthStr.indexOf(":")+2,tmpGrowthStr.indexOf("/")-1));
      populationGrowth += tmpGrowth;
      race.xillor.growth += tmpGrowth;
      tmpGrowthText = tmpGrowthStr.substring(tmpGrowthStr.indexOf("'")+1,tmpGrowthStr.lastIndexOf("'")-3);
      $(elt).parent('td').parent().find("td:last-child").append("<BR>" + tmpGrowthText );
    }
  )
	
  if (race.human.sum > 0) {
    race.human.avg = Math.round(race.human.sum / race.human.planets);
  }

  if (race.azterk.sum > 0) {
    race.azterk.avg = Math.round(race.azterk.sum / race.azterk.planets);
  }

  if (race.xillor.sum > 0) {
    race.xillor.avg = Math.round(race.xillor.sum / race.xillor.planets);
  }

  if (race.human.sum == 0) { race.human.sum = " ." }
  if (race.azterk.sum == 0) { race.azterk.sum = " ." }
  if (race.xillor.sum == 0) { race.xillor.sum = " ."}
  if (race.human.max == 0) { race.human.max = " ." }
  if (race.azterk.max == 0) { race.azterk.max = " ." }
  if (race.xillor.max == 0) { race.xillor.max = " ."}
  if (race.human.avg == 0) { race.human.avg = " ." }
  if (race.azterk.avg == 0) { race.azterk.avg = " ." }
  if (race.xillor.avg == 0) { race.xillor.avg = " ."}
  if (race.human.min == 9999999) { race.human.min = " ." }
  if (race.azterk.min == 9999999) { race.azterk.min = " ." }
  if (race.xillor.min == 9999999) { race.xillor.min = " ."}
  if (race.human.growth == 0) { race.human.growth = " ." }
  if (race.azterk.growth == 0) { race.azterk.growth = " ." }
  if (race.xillor.growth == 0) { race.xillor.growth = " ."}

  $(tab)
    .append(
          '<div class="banner" ' +
              'style="text-align: left; width: 580px;" ' +
              '>' +
              '<table border="0" width="100%">' +

              '<tr><th></th>' +
              '<th class="th_right">Total</th>' +
              '<th class="th_right">Human</th>' +
              '<th class="th_right">Azterk</th>' +
              '<th class="th_right">Xillor</th>' +
              '</tr>' +

              '<tr><td>Planet #</td>' +
              '<td class="td_right"><strong>'+ planets + '</strong></td>' +
              '<td class="td_right">' + race.human.planets + '</td>' +
              '<td class="td_right">' + race.azterk.planets + '</td>' +
              '<td class="td_right">' + race.xillor.planets + '</td></tr>' +

              '<tr><td>Population Sum</td>' +
              '<td class="td_right"><strong>'+ populationSum + '</strong></td>' +
              '<td class="td_right">' + race.human.sum + '</td>' +
              '<td class="td_right">' + race.azterk.sum + '</td>' +
              '<td class="td_right">' + race.xillor.sum + '</td></tr>' +

              '<tr><td>Population Max</td>' +
              '<td class="td_right"><strong>'+ populationMax + '</strong></td>' +
              '<td class="td_right">' + race.human.max + '</td>' +
              '<td class="td_right">' + race.azterk.max + '</td>' +
              '<td class="td_right">' + race.xillor.max + '</td></tr>' +

              '<tr><td>Population Avg</td>' +
              '<td class="td_right"><strong>'+ Math.round(populationSum / planets) + '</strong></td>' +
              '<td class="td_right">' + race.human.avg + '</td>' +
              '<td class="td_right">' + race.azterk.avg + '</td>' +
              '<td class="td_right">' + race.xillor.avg + '</td></tr>' +

              '<tr><td>Population Min</td>' +
              '<td class="td_right"><strong>'+ populationMin + '</strong></td>' +
              '<td class="td_right">' + race.human.min + '</td>' +
              '<td class="td_right">' + race.azterk.min + '</td>' +
              '<td class="td_right">' + race.xillor.min + '</td></tr>' +

              '<tr><td>Population Growth #</td>' +
              '<td class="td_right"><strong class="td_right">'+ populationGrowth + '</strong></td>' +
              '<td class="td_right">' + race.human.growth + '</td>' +
              '<td class="td_right">' + race.azterk.growth + '</td>' +
              '<td class="td_right">' + race.xillor.growth + '</td></tr>' +

              '</table></div><br />'
    );
});
