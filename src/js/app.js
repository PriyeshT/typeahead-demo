'use strict';

import $ from 'jquery';
import typeahead from 'typeahead.js';
import Bloodhound from 'bloodhound-js';

$(() => {
	
	let $typeahead = $('.typeahead-location');
	
	let location = new Bloodhound({
		datumTokenizer: function(datum) {
			return Bloodhound.tokenizers.whitespace(datum.value);
		},
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		remote: {
			url: 'https://developers.onemap.sg/commonapi/search?searchVal=%QUERY&returnGeom=Y&getAddrDetails=Y',
			wildcard: '%QUERY',
			filter: (data) => {
				return $.map(data.results, (result) => {
					return {
						value: result.ADDRESS,
						lat: result.LATITUDE,
						lon: result.LONGITUDE
					};
				});
			}
		}
	});

	location.initialize();

	$typeahead.typeahead({
		hint: false,
		highlight: true,
		minLength: 1
	}, {
		name: 'value',
		displayKey: 'value',
		source: location.ttAdapter()
	});

	$typeahead.on([
		'typeahead:initialized',
        'typeahead:initialized:err',
        'typeahead:selected',
        'typeahead:autocompleted',
        'typeahead:cursorchanged',
        'typeahead:opened',
        'typeahead:closed'
	].join(' '), (x) => {
		console.log(`selected value is ${x}`);
	});
})
