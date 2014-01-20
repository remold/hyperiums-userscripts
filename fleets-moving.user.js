// ==UserScript==
// @name        Moving Fleet Check all
// @namespace   http://github.com/remold/hyperiums-greasemonkey/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @include    http://hyp2.hyperiums.com/servlet/Fleets*
// @version     4
// @grant       none
// @copyright   2013+, Remold Krol (https://github.com/remold)
// @license     Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
// @author      Remold Krol
// @homepage    https://github.com/remold

// ==/UserScript==

/* global $:false */

"use strict";


$("form[name='movingFleetsForm']  tbody:first")
    .prepend(
        '<tr><td></td><td>SelectAll <input type="checkbox" id="fleetsMoveSelectAll" class="checkbox"></td></tr>');

$('#fleetsMoveSelectAll').
    click(function () {
        $("INPUT[type='checkbox']:not('#fleetsMoveSelectAll')").prop('checked', $('#fleetsMoveSelectAll').is(':checked'));
    }
);