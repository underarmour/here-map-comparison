/**

A service dedicated to keepin track of things like monitor size, count, and orientation

**/

angular.module('sizeService', []).service('SizeService', ['$rootScope', '$window', function($rootScope, $window) {
	
	// Detects which way the screen is facing
	// Note: Square screens are landscape
	function detectOrientation() {
		// When we resize to landscape view
		if($window.innerWidth >= $window.innerHeight) {
			$rootScope.$broadcast("rotate", "landscape");
		}
		
		// When we resize to portrait view
		else {
			$rootScope.$broadcast("rotate", "portrait");
		}
	}
	
	// Service listening for resize events
	angular.element($window).on('resize', function() {
		detectOrientation();
	});
	
	// This will ensure we get called once when the DOM is ready
	angular.element(document).ready(function () {
		detectOrientation();
    });
}]);