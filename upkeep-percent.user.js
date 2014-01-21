// ==UserScript==
// @name Upkeep percent          
// @namespace   http://github.com/remold/hyperiums-greasemonkey/
// @include     http://hyp2.hyperiums.com/servlet/Cash*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @version     1
// @grant       none
// @copyright   2012+, Nasga (https://github.com/Nasga) + Remold Krol (https://github.com/remold)
// @license     Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
// @author      Nasga (https://github.com/Nasga)
// @contributor Remold Krol (https://github.com/remold)
// @homepage    https://github.com/remold
// ==/UserScript==

/*global $:false */

"use strict";

var ti = $("td:contains('Total income from controlled planets')")
    .next("td")
    .text();

var deduct = $("td:contains('Deduction for planets above limit')")
    .next("td")
    .text();

var upkeep = $("td:contains('armies upkeep cost')")
    .next('td')
    .text();

if (upkeep) {
    ti = parseInt(
        ti.replace(/,/g,'')
    );
    if (deduct) {
        deduct = parseInt(
            deduct.replace(/,/g,'')
                .replace('-','')
        );
        ti = ti - deduct;

    };
    upkeep = parseInt(
        upkeep.replace(/,/g,'')
            .replace('-','')
    );

    var percent = Math.round(upkeep / ti * 1000) / 10;

    $("td:contains('armies upkeep cost')")
        .append(" (" + percent + "%)");
}
