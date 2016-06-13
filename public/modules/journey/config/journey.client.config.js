'use strict';

// Journey module config
angular.module('journey').run(['Menus',
	function(Menus) {
		// set top bar menu items
		Menus.addMenuItem('topbar','Add journey', 'journeys/add-journey');
		Menus.addMenuItem('topbar','Look for a ride', 'rides/search-journey');
	}
]);

