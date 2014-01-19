// ==UserScript==
// @name        Hyperiums forum enhancements
// @namespace   http://github.com/remold/hyperiums-greasemonkey/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @include     http://hyp2.hyperiums.com/servlet/Forums*
// @version     17
// @grant       none
// @copyright   2013+, Remold Krol (https://github.com/remold)
// @license     Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
// @author      Remold Krol
// @homepage    https://github.com/remold
// ==/UserScript==

/* global $:false */

"use strict";


if(window.location.search.indexOf("action=fenter") > -1) {
    var linkToLast;
    $('body center form td:not(.hc) a')
        .each(function(idx, elt) {
            linkToLast = $(elt).clone(true);
            linkToLast.prop("href",$(elt).prop("href") + "&gotolast=1");
            linkToLast.attr("Title","Last page");
            linkToLast.text('=>');
            $(elt).after(linkToLast);
            linkToLast.before(" ");
        }
    )

}

if(window.location.search.indexOf("action=fdispmsg") > -1) {
    if(window.location.search.indexOf("gotolast=1") > -1) {
        var lastPagelink = "";
        var currentLink = "";
//        /html/body/center/center/table[2]/tbody/tr/td/a
        $('td.hc.info:last a')
            .each(function(idx, elt) {
//                if(!elt.hasClass(avgText) && !elt.hasClass(hugeText)) {
//                alert("current=" + $(elt).prop("href"));
                    if( currentLink != "") {
                        lastPagelink = currentLink;
                    }
                    currentLink = $(elt).prop("href");
                }
//            }
        )
        if (lastPagelink != "") {
//            alert("result=" + lastPagelink);
            window.location.assign(lastPagelink);
        }

    }
}