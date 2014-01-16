// ==UserScript==
// @name        Population Avg
// @namespace   http://github.com/Nasga/hyperiums-greasemonkey/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @include     http://hyp2.hyperiums.com/servlet/Home
// @version     22
// @grant       none
// ==/UserScript==

/* global $:false */

"use strict";

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

  $('body div.tinytext:last')
    .after(
      '<div class="banner" ' +
      'style="text-align: left; width: 580px;" ' +
      '>' +
      'Planet # : <strong>'+ planets + '</strong> (' +
      ' H:<i>' + race.human.planets +
      '</i> | A:<i>' + race.azterk.planets +
      '</i> | X:<i>' + race.xillor.planets +
      '</i> )' +
      '<br />Pop Sum : <strong>'+ populationSum + '</strong> (' +
      ' H:<i>' + race.human.sum +
      '</i> | A:<i>' + race.azterk.sum +
      '</i> | X:<i>' + race.xillor.sum +
      '</i> )' +
      '<br /> Pop Max : ' +
      '<strong>' + populationMax + '</strong> (' +
      ' H:<i>' + race.human.max  +
      '</i> | A:<i>' + race.azterk.max +
      '</i> | X:<i>' + race.xillor.max +
      '</i> )'  +
      '<br /> Pop Avg : ' +
      '<strong>' + Math.round(populationSum / planets) + '</strong> (' +
      ' H:<i>' + race.human.avg  +
      '</i> | A:<i>' + race.azterk.avg +
      '</i> | X:<i>' + race.xillor.avg +
      '</i> )'  +
      '<br /> Pop Min : ' +
      '<strong>' + populationMin + '</strong> (' +
      ' H:<i>' + race.human.min  +
      '</i> | A:<i>' + race.azterk.min +
      '</i> | X:<i>' + race.xillor.min +
      '</i> )'  +
      '<br /> Pop Growth : ' +
      '<strong>' + populationGrowth + '</strong> (' +
      ' H:<i>' + race.human.growth  +
      '</i> | A:<i>' + race.azterk.growth +
      '</i> | X:<i>' + race.xillor.growth +
      '</i> )'  +
      '</div>' +
      '<br />'
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

  $(tab)
    .append(
      '<div class="banner" ' +
      'style="text-align: left; width: 580px;" ' +
      '>' +
      'Planet # : <strong>'+ planets + '</strong> (' +
      ' H:<i>' + race.human.planets +
      '</i> | A:<i>' + race.azterk.planets +
      '</i> | X:<i>' + race.xillor.planets +
      '</i> )' +
      '<br />Pop Sum : <strong>'+ populationSum + '</strong> (' +
      ' H:<i>' + race.human.sum +
      '</i> | A:<i>' + race.azterk.sum +
      '</i> | X:<i>' + race.xillor.sum +
      '</i> )' +
      '<br /> Pop Max : ' +
      '<strong>' + populationMax + '</strong> (' +
      ' H:<i>' + race.human.max  +
      '</i> | A:<i>' + race.azterk.max +
      '</i> | X:<i>' + race.xillor.max +
      '</i> )'  +
      '<br /> Pop Avg : ' +
      '<strong>' + Math.round(populationSum / planets) + '</strong> (' +
      ' H:<i>' + race.human.avg  +
      '</i> | A:<i>' + race.azterk.avg +
      '</i> | X:<i>' + race.xillor.avg +
      '</i> )'  +
      '<br /> Pop Min : ' +
      '<strong>' + populationMin + '</strong> (' +
      ' H:<i>' + race.human.min  +
      '</i> | A:<i>' + race.azterk.min +
      '</i> | X:<i>' + race.xillor.min +
      '</i> )'  +
      '<br /> Pop Growth : ' +
      '<strong>' + populationGrowth + '</strong> (' +
      ' H:<i>' + race.human.growth  +
      '</i> | A:<i>' + race.azterk.growth +
      '</i> | X:<i>' + race.xillor.growth +
      '</i> )'  +
      '</div>' +
      '<br />'
    );
});
