// ==UserScript==
// @name        Trading Page enhance
// @namespace   http://github.com/remold/hyperiums-greasemonkey/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @include     http://hyp2.hyperiums.com/servlet/Trading
// @version     1
// @grant       none
// @copyright   2014+, Remold Krol (https://github.com/remold)
// @license     Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
// @author      Remold Krol
// @homepage    https://github.com/remold
// ==/UserScript==

/* global $:false */

"use strict";

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {
        return;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function extractWTR(sStr) {
  var rx = /WTR (.*)%/g;
  var arr = rx.exec(sStr);
  return arr[1];
}

if ($('.formTitle').text() === "") {
addGlobalStyle(".td_right { text-align: right ! important; } .th_right { text-align: right ! important; }");

var tmpWTR = 0;
var wtr = {
        sum: 0,
        max: 0,
        min: 50,
        avg: 0,
        planets: 0

};

  $('td.hr:contains("WTR") td.hr:contains("WTR")')
    .each(function (idx, elt) {
      tmpWTR = parseInt( extractWTR($(elt).text()));
        wtr.planets++;
        wtr.sum += tmpWTR;
        if (tmpWTR > wtr.max) {
          tmpWTR.max = tmpWTR;
        }
        if (tmpWTR < tmpWTR.min) {
          tmpWTR.min = tmpWTR;
        }
    }
);


if (wtr.sum > 0) {
    wtr.avg = Math.round(wtr.sum / wtr.planets);
}


if (wtr.sum === 0) {
    wtr.sum = " .";
}
if (wtr.max === 0) {
    wtr.max = " .";
}
if (wtr.avg === 0) {
    wtr.avg = " .";
}
if (wtr.min === 9999999) {
    wtr.min = " .";
}

$('body center center')
    .after(
        '<div class="banner" ' +
            'style="text-align: left; width: 580px;" ' +
            '>' +
            '<table border="0" width="100%">' +
            '<tr><th></th>' +
            '<th class="th_right"> WTR</th>' +
            '</tr>' +

            '<tr><td>Planet #</td>' +
            '<td class="td_right"> ' + wtr.planets + '</td></tr>' +

            '<tr><td>Exploitation Sum</td>' +
            '<td class="td_right"> ' + wtr.sum + '</td></tr>' +

            '<tr><td>Exploitation Max</td>' +
            '<td class="td_right"> ' + wtr.max + '</td></tr>' +

            '<tr><td>Exploitation Avg</td>' +
            '<td class="td_right"> ' + wtr.avg + '</td></tr>' +

            '<tr><td>Exploitation Min</td>' +
            '<td class="td_right"> ' + wtr.min + '</td></tr>' +

            '</table></div><br />'
    );

}