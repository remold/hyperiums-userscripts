// ==UserScript==
// @name        Hyperiums Contacts Sorter
// @namespace   http://github.com/remold/hyperiums-greasemonkey/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require     https://raw.github.com/remold/hyperiums-userscripts/master/libs/jquery.tablesorter.js
// @include     http://hyp2.hyperiums.com/servlet/Player?page=Contacts
// @version     3
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

addGlobalStyle('.tablesorter-header { background-image: url("data:image/gif;base64,R0lGODlhFQAJAIAAAP///////yH5BAEAAAEALAAAAAAVAAkAAAIXjI+AywnaYnhUMoqt3gZXPmVg94yJVQAAOw==");' +
    '  background-position: right center;' +
    ' background-repeat: no-repeat;' +
    ' cursor: pointer;' +
    ' padding: 4px 20px 4px 4px; }');
addGlobalStyle('.tablesorter-headerAsc { background-image: url("data:image/gif;base64,R0lGODlhFQAEAIAAAP///////yH5BAEAAAEALAAAAAAVAAQAAAINjI8Bya2wnINUMopZAQA7"); }');
addGlobalStyle('.tablesorter-headerDesc { background-image: url("data:image/gif;base64,R0lGODlhFQAEAIAAAP///////yH5BAEAAAEALAAAAAAVAAQAAAINjB+gC+jP2ptn0WskLQA7"); }');


$('table.stdArray:first').prepend('<thead />');
$('table.stdArray:first thead').prepend( $('table.stdArray:first tbody tr:first') );
$('table.stdArray:first thead tr:first').children('td').replaceWith(function(i, html) {
    return '<th>' + html + '</th>';
});
$('table.stdArray:first').tablesorter();