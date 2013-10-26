// ==UserScript==
// @name        map-trading-assign
// @namespace   http://github.com/nasga/hyperiums-greasemonkey
// @description Assign planets to players
// @include     http://hyp2.hyperiums.com/servlet/Maps?maptype=planets_trade
// @include     http://hyp2.hyperiums.com/servlet/Maps
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require     https://raw.github.com/krisnoble/Portamento/master/portamento.js
// @version     1
// @grant       none
// ==/UserScript==

var colors = {};

$('body')
  .append(
    '<div id="mapPlayerList" style="display:none;">' +
      '<h3>Playerlist</h3>' +
      '<ul></ul>' +
      '<form>' +
      '<input type="text"' +
      ' class="thin"' +
      ' style="width:100px"' +
      ' name="mapPlayerAdd" />&nbsp;' +
      '<input type="submit" ' +
      ' id="mapPlayerAddBtn"' +
      ' value="Add"' + 
      ' class="button thinbut" />' +
      '</form>' +
    '</div>'
  );

$('#mapPlayerList')
  .css('position', 'fixed')
  .css('background-color', '#FFF')
  .css('border', '1px solid #999')
  .show()
  .portamento();
$('#mapPlayerList ul')
  .css('margin', '0')
  .css('padding', '0');
var assign = {}
assign.start = function () {
  console.log('assign start');
}
assign.export = function () {}
assign.import = function () {}

var player = {}
player.list = Array();
player.add = function (name, color) {
  if (color === null) {
    color = colors.random();
  }
  this.list[name] = {
    name: name,
    color: color
  };
}

player.remove = function (name) {
  console.log('remove : ' + name);
  delete this.list[name];
  console.log(this.list);
  this.display();
}

player.display = function () {
  var key;
  $('#mapPlayerList ul li').remove();
  for (key in this.list) {
    $('#mapPlayerList ul').append(
      '<li id="' + this.list[key].name + '">' +
      '<input type="button"' +
      ' value="-"' +
      ' class="button thinbut playerRemove"' +
      ' onclick="player.remove(\'' + this.list[key].name + '\');"' +
      ' />' +
      this.list[key].name +
      '<span style="line-height: 1em; float:right; margin-right:8px; width:1em; background-color:' + this.list[key].color + ';">' +
      '&nbsp;' + 
      '</span>' +
      '<input type="button"' +
      ' value="+"' +
      ' onclick="assign.start();"' +
      '</li>'
    );
  }

  $('#mapPlayerList ul li')
    .css('margin', '0')
    .css('list-style', 'none');
}

colors.names = {
  aqua: "#00ffff",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  black: "#000000",
  blue: "#0000ff",
  brown: "#a52a2a",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgrey: "#a9a9a9",
  darkgreen: "#006400",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkviolet: "#9400d3",
  fuchsia: "#ff00ff",
  gold: "#ffd700",
  green: "#008000",
  indigo: "#4b0082",
  khaki: "#f0e68c",
  lightblue: "#add8e6",
  lightcyan: "#e0ffff",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  magenta: "#ff00ff",
  maroon: "#800000",
  navy: "#000080",
  olive: "#808000",
  orange: "#ffa500",
  pink: "#ffc0cb",
  purple: "#800080",
  violet: "#800080",
  red: "#ff0000",
  silver: "#c0c0c0",
  white: "#ffffff",
  yellow: "#ffff00"
};

colors.random = function () {
  var result;
  var count = 0;
  for (var prop in this.names)
    if (Math.random() < 1 / ++count)
      result = prop;
  return result;
};

$('#mapPlayerList').submit(function () {
  player.add(
    $('input[name=mapPlayerAdd]').val(),
    null
  );
  player.display();

  $('input[name=mapPlayerAdd]').val('');
  return false;
});
