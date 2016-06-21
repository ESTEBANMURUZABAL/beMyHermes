'use strict';

// Journey module config
angular.module('journey').run(['Menus',
	function(Menus) {
		// set top bar menu items
		Menus.addMenuItem('topbar','Create a journey', 'journeys/add-journey');
		Menus.addMenuItem('topbar','Look for a ride', 'journeys/search-journey');
	}
]);

