// ==UserScript==
// @name        Hyperiums forum enhancements
// @namespace   http://github.com/remold/hyperiums-greasemonkey/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @include     http://hyp2.hyperiums.com/servlet/Forums*
// @version     34
// @grant       none
// @copyright   2013+, Remold Krol (https://github.com/remold)
// @license     Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
// @author      Remold Krol
// @homepage    https://github.com/remold
// ==/UserScript==

/* global $:false */

"use strict";

function getHypTheme() {
    var theme = "0";
    $('head link')
        .each(function (idx, elt) {
            if ($(elt).attr('href').indexOf("favicon") > 0) {
                if ($(elt).attr('href').substr(0, 5) == "/misc") {
                    theme = "0";
                } else {
                    theme = $(elt).attr('href').substr(13, 1);
                }
            }
        }
    )
    return theme;
}

function getUrlVars(urlIn) {
    var vars = {};
    var parts = urlIn.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function getForumIds() {
    var forumIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "11"];
    var href = "";
    var fId = "";
    $('#forumSubmenu li a')
        .each(function (idx, elt) {
            href = $(elt).attr("href");
            if (href.indexOf("forumid") > 0) {
                fId = href.substr(href.lastIndexOf("=") + 1);
                if (fId != "2") {
                    forumIds.push(fId);
                }
            }
        }
    )
    return forumIds;
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

    var forumIds = getForumIds();
//    <a href="Alliance?tagid=590">
    var currentForum = "0";
    $('a').each(function (idx, elt) {
            var attr = $(elt).attr("href");
            if ((attr) && (attr.indexOf("Alliance") == 0)) {
                currentForum = attr.substr(attr.indexOf("=") + 1);
            }
        }
    )
    if (currentForum == "0") {
        currentForum = getUrlVars(window.location.href)["forumid"];
    }

    if (currentForum != "0") {
        var prev = forumIds[($.inArray(currentForum, forumIds) - 1 + forumIds.length) % forumIds.length];
        var next = forumIds[($.inArray(currentForum, forumIds) + 1) % forumIds.length];

        $('body ul.solidblockmenu2').prepend('<li><a class="megaTextItem" id="nextForum" ' +
            'href="http://hyp2.hyperiums.com/servlet/Forums?action=fenter&forumid=' + next + '">>>></li>');
        $('body ul.solidblockmenu2').prepend('<li><a class="megaTextItem" id="prevForum" ' +
            'href="http://hyp2.hyperiums.com/servlet/Forums?action=fenter&forumid=' + prev + '"><<<</li>');
    }
//    $('#htopmenu2 li:eq(0)').appendTo('#htopmenu2');
    /*
     $('#prevForum').click(function () {
     var forumIds = getForumIds();
     var currentForum = getUrlVars(window.location.href)["forumid"];
     var prev = forumIds[($.inArray(currentForum, forumIds) - 1 + forumIds.length) % forumIds.length];

     //            alert(forumIds.toString());
     }
     );
     $('#nextForum').click(function () {
     var forumIds = getForumIds();
     var currentForum = getUrlVars(window.location.href)["forumid"];
     var next = forumIds[($.inArray(currentForum, forumIds) + 1) % forumIds.length];
     window.location.assign("http://hyp2.hyperiums.com/servlet/Forums?action=fenter&forumid=" + next);
     }
     );
     */
}

if (window.location.search.indexOf("action=fdispmsg") > -1) {
    if (window.location.search.indexOf("gotolast=1") > -1) {
        var lastPagelink = "";
        var currentLink = "";
//        /html/body/center/center/table[2]/tbody/tr/td/a
        $('td.hc.info:last a')
            .each(function (idx, elt) {
//                if(!elt.hasClass(avgText) && !elt.hasClass(hugeText)) {
//                alert("current=" + $(elt).prop("href"));
                if (currentLink != "") {
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