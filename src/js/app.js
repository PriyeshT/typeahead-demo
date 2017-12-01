'use strict';

import $ from 'jquery';
import typeahead from 'typeahead.js';
import Bloodhound from 'bloodhound-js';

$(() => {
	let $title = $('.title').text();
	console.log(`page title is ${$title}`);
})
