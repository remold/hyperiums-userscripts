// ==UserScript==
// @name        Hyperiums forum enhancements
// @namespace   http://github.com/remold/hyperiums-greasemonkey/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @include     http://hyp2.hyperiums.com/servlet/Forums*
// @version     36
// @grant       none
// @copyright   2013+, Remold Krol (https://github.com/remold)
// @license     Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
// @author      Remold Krol
// @homepage    https://github.com/remold
// ==/UserScript==

/* global $:false */

"use strict";

function getUrlVars(urlIn) {
    var vars = {};
    var parts = urlIn.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

if ((window.location.search.indexOf("action=fenter") > -1) ||
    (($('body center center span.info:not(.bigtext)').length > 0) &&
        (window.location.search.indexOf("action=lastmsg") > -1))) {
    var linkToLast;
    $('body center form td:not(.hc) a')
        .each(function (idx, elt) {
            linkToLast = $(elt).clone(true);
            linkToLast.prop("href", $(elt).prop("href") + "&gotolast=1");
            linkToLast.attr("Title", "Last page");
            linkToLast.text('=>');
            $(elt).after(linkToLast);
            linkToLast.before(" ");
        }
    );

    var currentForum = getUrlVars(window.location.href)["forumid"];
    if (currentForum != "undefined") {

        // get all forum Ids from the top menu
        var forumIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "11"];
        var allianceOnlyIds = [];
        $('#forumSubmenu li a')
            .each(function (idx, elt) {
                var href = $(elt).attr("href");
                if (href.indexOf("forumid") > 0) {
                    var fId = href.substr(href.lastIndexOf("=") + 1);
                    if (fId != "2") {
                        forumIds.push(fId);
                        allianceOnlyIds.push(fId);
                    }
                }
            }
        )

        // calculate nex/prev/
        var prev = forumIds[($.inArray(currentForum, forumIds) - 1 + forumIds.length) % forumIds.length];
        var next = forumIds[($.inArray(currentForum, forumIds) + 1) % forumIds.length];
        var nextAO = allianceOnlyIds[($.inArray(currentForum, allianceOnlyIds) + 1) % allianceOnlyIds.length];

        // add buttons to the left of the sub menu
        $('body ul.solidblockmenu2').prepend('<li><a class="megaTextItem" id="nextForum" ' +
            'href="http://hyp2.hyperiums.com/servlet/Forums?action=fenter&forumid=' + nextAO + '">>AO></li>');
        $('body ul.solidblockmenu2').prepend('<li><a class="megaTextItem" id="nextForum" ' +
            'href="http://hyp2.hyperiums.com/servlet/Forums?action=fenter&forumid=' + next + '">>>></li>');
        $('body ul.solidblockmenu2').prepend('<li><a class="megaTextItem" id="prevForum" ' +
            'href="http://hyp2.hyperiums.com/servlet/Forums?action=fenter&forumid=' + prev + '"><<<</li>');
    }
}

// If a Forum Thread Display page is shown and contains the special gotolast parameter
// search the last page of the thread and redirect to it
if (window.location.search.indexOf("action=fdispmsg") > -1) {
    if (window.location.search.indexOf("gotolast=1") > -1) {
        var lastPagelink = "";
        var currentLink = "";
        $('td.hc.info:last a')
            .each(function (idx, elt) {
                if (currentLink != "") {
                    lastPagelink = currentLink;
                }
                currentLink = $(elt).prop("href");
            }
        )
        if (lastPagelink != "") {
            window.location.assign(lastPagelink);
        }

    }
}