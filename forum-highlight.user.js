// ==UserScript==
// @name        Hyperiums forum highlighting
// @namespace   http://github.com/Nasga/hyperiums-greasemonkey/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @include     http://hyp2.hyperiums.com/servlet/Forums*
// @version     34
// @grant       none
// ==/UserScript==

/* global $:false */

"use strict";

var storageAvailable = false;

if (typeof(Storage) !== "undefined") {
    storageAvailable = true;
}
var forumJSon = getForumStorage();

function storeForumPostDate(forumThreadId, forumPostDate) {
    var dummy;
    if (!forumJSon[forumThreadId]) {
        forumJSon[forumThreadId] = forumPostDate;
        return true;
    }
    var storedForumPostDate = new Date(forumJSon[forumThreadId]);
    if (forumPostDate > storedForumPostDate) {
        forumJSon[forumThreadId] = forumPostDate;
    }
    return true;
}

function hypDateToDate(hypDate) {
    return new Date(
        hypDate.substr(0, 4),
        parseInt(hypDate.substr(5, 2)) - 1,
        hypDate.substr(8, 2),
        hypDate.substr(11, 2),
        hypDate.substr(14, 2),
        hypDate.substr(17, 2),
        0
    )
}

function needHighlight(threadId, forumPostDate) {
    if (forumJSon[threadId]) {
        storedForumDate = new Date(forumJSon[threadId]);
    } else {
        storedForumDate = new Date(1970, 0, 1);
    }
    if (forumPostDate > storedForumDate) {
        return true;
    }
    return false;
}

function getForumStorage() {
    if (!storageAvailable) {
        return "";
    }
    var forumStorage = localStorage.forumStorage;
    if (forumStorage) {
        return JSON.parse(forumStorage);
    }
    else {
        return {};
    }
}

function setForumStorage(forumStorageIn) {
    localStorage.forumStorage = JSON.stringify(forumStorageIn);
    return true;
}

function getUrlVars(urlIn) {
    var vars = {};
    var parts = urlIn.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

if (window.location.search.indexOf("action=fenter") > -1) {
    if (storageAvailable) {
        var link = "";
        var threadId = "";
        var forumThreadLastPost;
        $('body center form tr:not(#forumArray)')
            .each(function (idx, elt) {
                // x = $(elt).parent();
                //.find("td.hc:first");

                link = $(elt).find('td:not(.hc) a:first').prop("href");
                threadId = getUrlVars(link)["threadid"];
                forumThreadLastPost = hypDateToDate($(elt).find('td.hc:eq(2)').text());
                if (needHighlight(threadId, forumThreadLastPost)) {
                    $(elt).find('td:not(.hc) a:first').css("font-style", "italic");
                }
            }
        )
    }
}

if (window.location.search.indexOf("action=fdispmsg") > -1) {
    if (storageAvailable) {
        var forumPostDate;
        var forumThreadId;
        var storedForumDate;
        forumThreadId = getUrlVars(window.location.href)["threadid"];

        if (forumJSon[forumThreadId]) {
            storedForumDate = new Date(forumJSon[forumThreadId]);
        } else {
            storedForumDate = new Date(1970, 0, 1);
        }
        $('body table.sender td.player')
            .each(function (idx, elt) {
                forumPostDate = hypDateToDate($(elt).text().substr(0, 19));
//            alert(forumPostDate);
                if (forumPostDate > storedForumDate) {
                    forumJSon[forumThreadId] = forumPostDate.toUTCString();
                }
            }
        )
        setForumStorage(forumJSon);
    }
}

if (window.location.search.indexOf("action=lastmsg") > -1) {
    if (storageAvailable) {
        var forumPostDate;
        var forumThreadId;
        var storedForumDate;
        var link = "";

        $('body center table.hc:not(.body)')
            .each(function (idx, elt) {
                if ($(elt).width() > 460) {
                    link = $(elt).find('tr.msgForum td.hc a').attr("href");
//                if (link != 'undefined') {
                    forumThreadId = getUrlVars(link)["threadid"];
                    if (forumJSon[forumThreadId]) {
                        storedForumDate = new Date(forumJSon[forumThreadId]);
                    } else {
                        storedForumDate = new Date(1970, 0, 1);
                    }
                    forumPostDate = hypDateToDate($(elt).find('table.sender td.player').text().substr(0, 19));
                    if (forumPostDate > storedForumDate) {
                        forumJSon[forumThreadId] = forumPostDate.toUTCString();
                    }
                }
            }
        )
        setForumStorage(forumJSon);
    }
}
