// ==UserScript==
// @name        Hyperiums ticks
// @namespace   http://nasga.github.com/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require     https://raw.github.com/Nasga/hyperiums-userscripts/master/libs/moment.min.js
// @include     http://hyp2.hyperiums.com/servlet/*
// @version     3
// @grant       none
// ==/UserScript==

// This is a port from https://github.com/resident-uhlig/chrome-hyperiums7
// Thanks to natalie_g for the original work

/* global $:false, moment:false */
"use strict";

function Tick(name, atMinute, everyNthHour, startHour) {
  this.name = name;
  this.atMinute = atMinute;
  this.everyNthHour = everyNthHour || 1;
  this.startHour = startHour || 0;
}

Tick.prototype.getNextDate = function (serverDate) {
  var nextDate = new Date(serverDate);
  nextDate.setUTCMilliseconds(0);
  nextDate.setUTCSeconds(0);
  nextDate.setUTCMinutes(this.atMinute);

  if (serverDate.getUTCMinutes() >= this.atMinute) {
    nextDate.setUTCHours(nextDate.getUTCHours() + 1);
  }

  var h = (nextDate.getUTCHours() + 24 - this.startHour) % this.everyNthHour;
  if (this.everyNthHour > 1 && h) {
    nextDate.setUTCHours(nextDate.getUTCHours() + this.everyNthHour - h);
  }
  return nextDate;
};

var Hyperiums7 = {
  ticks: [
    new Tick('Build', 23),
    new Tick('Cash', 31, 8, 6),
    new Tick('Move/Control', 26),
    new Tick('Energy/Tech', 18),
    new Tick('N/A', 6),
    new Tick('Battle', 6, 2)
  ].sort(function (a, b) {
    return a.name.localeCompare(b.name);
  })
};

var ticks = Hyperiums7.ticks;


var offsetInMS = new Date().getTime() -
  new Date(
    $('.servertime')
      .eq(0)
      .text()
      .match(/(\d){4}-(\d){2}-(\d){2} (\d){2}:(\d){2}:(\d){2}/)[0]
      .replace(' ','T') + '+00:00'
    );

$('.servertime').remove();
var $div = $('<div id="hyperiums7-ticks" class="servertime">');
$('body').append($div);
$('body').append(
  '<style type="text/css">' +
  '#hyperiums7-ticks {' +
    'position:fixed;' +
    'bottom:0;' +
    'left:0;' +
    'width:100%;' +
    'background:#000;' +
    'color:#fff;' +
    'border-top:1px solid #3a3a3a;' +
    'padding:0.3em 0.5em;' +
    'text-align:center;' +
  '}' +
  '#hyperiums7-ticks ul {' +
    'list-style-type:none;' +
    'margin:0;' +
    'padding:0;' +
    'display:inline;' +
  '}' +
  '#hyperiums7-ticks ul li {' +
    'display:inline;' +
    'margin:0 0.5em;' +
    'white-space:nowrap;' +
  '}' +
  '#hyperiums7-ticks ul li[title] {' +
    'cursor:help;' +
  '}' +
  '.hyperiums7-blink {' +
    '-webkit-animation-name:hyperiums7-blink;' +
    '-webkit-animation-duration:300ms;' +
    '-webkit-animation-timing-function:linear;' +
    '-webkit-animation-iteration-count:infinite;' +
  '}' +
  '@-webkit-keyframes hyperiums7-blink {' +
    '0% { opacity: 1.0; }' +
    '50% { opacity: 0.5; }' +
    '100% { opacity: 1.0; }' +
  '}' +
  '</style>'
);

(function ticker() {
  var serverDate = new Date(new Date().getTime() - offsetInMS);
  $div.empty();
  var ul = $('<ul>');
  ul.append($('<li>')
    .text(
      'Server Time: ' + moment(serverDate).utc().format('YYYY-MM-DD HH:mm:ss')
  ));
  $.each(ticks, function (_, tick) {
    var nextDate = tick.getNextDate(serverDate);
    var msUntilNextDate = nextDate.getTime() - serverDate.getTime();
    var li = $('<li>').
      text(tick.name + ': ' + moment(msUntilNextDate).utc().format('HH:mm:ss')).
      attr('title', moment(nextDate).utc().format('YYYY-MM-DD HH:mm:ss'));
    if (msUntilNextDate < 10000) { // 10 seconds
      li.addClass('hyperiums7-blink');
    }
    if (msUntilNextDate < 60000) { // 1 minute
      li.addClass('alert');
    } else if (msUntilNextDate < 300000) { // 5 minutes
      li.addClass('alertLight');
    } else if (msUntilNextDate < 600000) { // 10 minutes
      li.addClass('hlight');
    }
    ul.append([' ', li]);
  });
  $div.append(ul);

  window.setTimeout(ticker, 500);
})();
