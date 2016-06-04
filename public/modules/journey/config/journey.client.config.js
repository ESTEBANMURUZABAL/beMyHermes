'use strict';

// Journey module config
angular.module('journey').run(['Menus',
	function(Menus) {
		// set top bar menu items
		Menus.addMenuItem('topbar','Add a route', 'routes', '/routes');
		Menus.addMenuItem('topbar','Look for a ride', 'rides', '/rides');
	}
]);

