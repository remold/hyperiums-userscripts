// ==UserScript==
// @name        Hyperiums forum backup
// @namespace   http://github.com/remold/hyperiums-greasemonkey/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require     https://raw.githubusercontent.com/remold/hyperiums-userscripts/master/libs/fso.min.js
// @include     http://hyp2.hyperiums.com/servlet/Forums*
// @version     2
// @grant       none
// @copyright   2014+, Remold Krol (https://github.com/remold)
// @license     Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
// @author      Remold Krol
// @homepage    https://github.com/remold
// ==/UserScript==

/* global $:false */

"use strict";

/**
*	FSO(
*		opt_byteSize, [= 1024 * 1024 * 1024]
*		opt_usePersistentStorage, [= false]
*		opt_successCallback, [= null]
*		opt_errorCallback [= null]
* 	);
*/

var fso = new FSO(1024 * 1024 * 100, false);

var fsq = fso.createQueue();

fsq.write(
	'Hyperiums/hello.txt',
	'Hello World',
	function() { console.log('wrote to file');
})

fsq.execute(
	function() { console.log('Complete!') },
	function(e) { console.log('OMG an error!'); }
);