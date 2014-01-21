// ==UserScript==
// @name        Trading map
// @namespace   https://github.com/Nasga/hyperiums-greasemonkey
// @description Hyperiums trading map
// @include     http://hyp2.hyperiums.com/servlet/Maps?maptype=planets_trade
// @include     http://hyp2.hyperiums.com/servlet/Maps
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @version     6
// @grant       none
// ==/UserScript==

/*
 ### Revisions
 v6
 * Add planet count
 v5
 * Fix bhed planets
 v4
 * Add civ level
 v3
 * Manage planet id for future use
 v2
 * Empty tag will now display []
 * Fix a bug, the center planet was not visible on the map.
 v1
 * Initial release
 */
$('#searchButton')
  .after(
    '&nbsp;' + 
    '<input type="button" ' +
    'value="Transform into map" ' +
    'id="mapRender" ' +
    'class="button thinbut" />' +
    '<input type="button" ' +
    'value="Back to the list" ' +
    'id="mapBack" ' +
    'class="button thinbut" ' +
    'style="display:none" />'
  );

var map = {}
map.planets = {};
map.planetCount = 0;
map.x = {}
map.x.min = null;
map.x.max = null;
map.y = {}
map.y.min = null;
map.y.max = null;
map.flush = function () {
  this.planets = {}
  this.planetCount = 0;
  this.x = {
    min: null,
    max: null
  }
  this.y = {
    min: null,
    max: null
  }
  $('#mapTable').remove();
}
map.populate = function () {
  var self = this;
  $('table.stdArray tr.line0')
    .add('table.stdArray tr.line1')
    .add('table.stdArray tr.lineCenteredOn')
    .each(function (obj) {
    var planet,
      coords,
      x,
      y;
    planet = self.parse($(this));
    coords = planet
      .coords
      .replace('(', '')
      .replace(')', '')
      .split(',');
    x = parseInt(coords[0], 10);
    y = parseInt(coords[1], 10);

    if (x > self.x.max || self.x.max === null) {
      self.x.max = x;
    }
    if (x < self.x.min || self.x.min === null) {
      self.x.min = x;
    }
    if (y > self.y.max || self.y.max === null) {
      self.y.max = y;
    }
    if (y < self.y.min || self.y.min === null) {
      self.y.min = y;
    }

    if (self.planets[planet.coords] === undefined) {
      self.planets[planet.coords] = Array();
    }

    self.planets[planet.coords].push(planet);
    self.planetCount++;
  });   
}
map.back = function () {
  $('input#mapRender').show();
  $('input#mapBack').hide();
  $('table.stdArray').show();
  this.flush();
}
map.renderer = function () {

  var self = this;

  this.flush();
  $('input#mapRender').hide();
  $('input#mapBack').show();
  $('table.stdArray').hide();
  this.populate();

  $('table.stdArray').before('<table id="mapTable"><tbody></tbody></table>');

  var y, x, $y, $coords;

  for (y = this.y.max; y >= this.y.min; y--) {

    $y = $('table#mapTable tbody').append('<tr></tr>');

    for (x = this.x.min; x <= this.x.max; x++) {
      $y.append(
        '<td class="mapCoords">' +
        '<h2>' + x + ',' + y + '</h2>' +
        '<input type="hidden" value="' + x + ',' + y + '" />' +
        '<ul class="mapPlanets"></ul>' +
        '</td>'
      );
    
      $coords = $('input[value="' + x + ',' + y + '"]')
        .parent('td')
        .find('ul');

      var key, nb = 0;

      if (this.planets['(' + x + ',' + y + ')'] !== undefined) {

        for (key in this.planets['(' + x + ',' + y + ')']) {
          var planet;
          planet = this.planets['(' + x + ',' + y + ')'][key];
          $coords.append(
            '<li id="' + planet.id + '"' +
            'class="' + planet.class + '">' +
            planet.name + ' ' +
            planet.tag + ' ' +
            planet.civ + ' ' + 
            planet.race +
            planet.type + ' ' +
            planet.gov + ' ' + 
            planet.activity + 
            '</li>'
          );

          nb++;
        }
      }

      while (nb < 4) {
        $coords.append('<li>&nbsp;</li>');
        nb++;
      }
    }
  }

  this.applyStyle();
  this.displaySum();
}
map.displaySum = function() {
  $('.bigtext')
    .append(' Total planets : ' + this.planetCount);
}
map.applyStyle = function () {
  
  $('.mapPlanets').css('list-style', 'none');
  $('.mapPlanets').css('margin', '0');
  $('.mapPlanets').css('padding', '0');
  $('#mapTable').css('border-collapse', 'separate');
  $('#mapTable').css('border-spacing', '2px');
  $('#mapTable h2').css('padding', '2px');
  $('#mapTable h2').css('margin', '0px');
  $('#mapTable h2').css('width', '250px');
  $('#mapTable td').css('border', '1px solid #999');

}

map.parse = function ($obj) {
  var planet = {
    "name": $obj.find('td:eq(0)').text().replace('@ ', ''),
    "tag": $obj.find('td:eq(1)').text(),
    "coords": $obj.find('td:eq(2)').text(),
    "civ": $obj.find('td:eq(3)').text(),
    "gov": $obj.find('td:eq(4)').text(),
    "race": $obj.find('td:eq(5)').text(),
    "type": $obj.find('td:eq(7)').text(),
    "activity": $obj.find('td:eq(8)').text()
  }

  if ($obj.hasClass('alertLight')) {
    planet.class = 'alertLight';
  }

  hrefNews = $obj.find('td:eq(0) a').attr('href');
  if (hrefNews) {
    if (hrefNews.search('planetid=') >= 0) {
      planet.id = hrefNews.replace('Maps?planetnews=&planetid=','');
    } else {
      planet.id = $obj.find('td:eq(0) a')
        .attr('onclick')
        .match(/toPlanetId=(\d+);/)[1];
    }
  }

  if (planet.tag === '-') {
    planet.tag = '[]';
  }

  switch (planet.race) {
  case 'Xillor':
    planet.race = 'X';
    break;
  case 'Azterk':
    planet.race = 'A';
    break;
  case 'Human':
    planet.race = 'H';
    break;
  }

  switch (planet.type) {
  case 'Agro':
    planet.type = 'A';
    break;
  case 'Techno':
    planet.type = 'T';
    break;
  case 'Minero':
    planet.type = 'M';
    break;
  }

  return planet;
} 

$('#mapRender').click(function () { map.renderer(); });
$('#mapBack').click(function () { map.back(); });
