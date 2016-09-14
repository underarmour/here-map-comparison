mainApp.controller("mainController", ['$scope', 'NgMap', function($scope, NgMap) {
	
	//Global variable declarations
	$scope.zoom = '8';
	
	init();
	
	/**Init Method **/
	function init() {
		
		//Local variable declarations
		var data = [];
		var heatMapData = [];
		
		// Check whether the environment should use hi-res maps
	    var hidpi = ('devicePixelRatio' in window && devicePixelRatio > 1);
		
		// Create a platform object to communicate with the HERE REST APIs
	    var platform = new H.service.Platform({}),
	        maptypes = platform.createDefaultLayers(/*{pois: true}*/); //platform.createDefaultLayers(hidpi ? 1024 : 512, hidpi ? 640 : null);
	    
	    var tileLayer = new H.map.layer.TileLayer(tileProvider);
	    var group = new H.map.Group(); 
	    
	    // Instantiate a map in the 'map' div, set the base map to normal
	    $scope.hereMap = new H.Map(document.getElementById('heremapContainer'), maptypes.normal.map, {
	    	center: { lng: -76.6, lat: 39.2 },
	        zoom: 8,
	        //pixelRatio: hidpi ? 2 : 1
	    });
	
	    $scope.hereMap.setBaseLayer(tileLayer);
	    $scope.hereMap.addObject(group);
	    
	    // Enable the map event system
	    var mapevents = new H.mapevents.MapEvents($scope.hereMap);
	    
	    // Enable map interaction (pan, zoom, pinch-to-zoom)
	    var behavior = new H.mapevents.Behavior(mapevents); 
	    
	    // Enable ui functionality
	    var ui = H.ui.UI.createDefault($scope.hereMap, maptypes);
		
	    // Remove map settings as unnecessary
	    ui.removeControl('mapsettings'); 
	    
		//Populate Heatmap data
		data.push({location: new google.maps.LatLng('39.283977', '-76.602782'), weight: 100},
				  {location: new google.maps.LatLng('39.260086', '-76.607799'), weight: 150},
				  {location: new google.maps.LatLng('39.290507', '-76.611822'), weight: 200},
				  {location: new google.maps.LatLng('39.298545', '-76.602951'), weight: 500},//Baltimore
				  {location: new google.maps.LatLng('33.748995', '-84.387982'), weight: 600},
				  {location: new google.maps.LatLng('38.907192', '-77.036871'), weight: 650},
				  {location: new google.maps.LatLng('40.440625', '-79.995886'), weight: 900},
				  {location: new google.maps.LatLng('36.162664', '-86.781602'), weight: 980},
				  {location: new google.maps.LatLng('35.227087', '-80.843127'), weight: 1000}
	    );
		
		$scope.data = angular.copy(data);
		
//		data.map(function(obj) {
//	          heatMapData.push({lat: obj.lat, lng: obj.long , value: obj.weight.toString()});
//    	});
		
		heatMapData.push({lat: '39.283977', lng: '-76.602782', value: '100'},
				  {lat: '39.260086', lng: '-76.607799', value: '150'},
				  {lat: '39.290507', lng: '-76.611822', value: '200'},
				  {lat: '39.298545', lng: '-76.602951', value: '500'},//Baltimore
				  {lat: '33.748995', lng: '-84.387982', value: '600'},
				  {lat: '38.907192', lng: '-77.036871', value: '650'},
				  {lat: '40.440625', lng: '-79.995886', value: '900'},
				  {lat: '36.162664', lng: '-86.781602', value: '980'},
				  {lat: '35.227087', lng: '-80.843127', value: '1000'}
	    );
		
		var heatmapProvider = new H.data.heatmap.Provider({
  		  colors: new H.data.heatmap.Colors({
//			  	  '0': 'blue',
//		  		  '0.2': 'yellow',
//		  		  '0.5': 'rgba(0, 64, 255, 1)',
//		  		  '0.7': 'red',
//		  		  '1': 'red' 
        	  	'0':   'rgba(0, 255, 255, 0)',
                '0.1': 'rgba(0, 255, 255, 1)',
                '0.2': 'rgba(0, 191, 255, 1)',
                '0.3': 'rgba(0, 127, 255, 1)',
                '0.1': 'rgba(0, 63, 255, 1)',
                '0.2':    'rgba(0, 0, 255, 1)',
                '0.3':    'rgba(0, 0, 223, 1)',
                '0.4':   'rgba(0, 0, 191, 1)',
                '0.5':    'rgba(0, 0, 159, 1)',
                '0.6':    'rgba(0, 0, 127, 1)',
                '0.7':    'rgba(63, 0, 91, 1)',
                '0.8':    'rgba(127, 0, 63, 1)',
                '0.9':    'rgba(191, 0, 31, 1)',
                '1':   'rgba(255, 0, 0, 1)'
  		  }, 
  		  true),
  		  // paint assumed values in regions where no data is available
  		  assumeValues: false,
  		});
  	
		// Add the data
		heatmapProvider.clear();
		heatmapProvider.addData(heatMapData);
  	
		var heatmapProvider = new H.map.layer.TileLayer(heatmapProvider, {
				opacity: 1,
				setMin: '6',
				coarseness: 3
		});

		if (heatmapProvider) {
			$scope.hereMap.addLayer(heatmapProvider);	
		}
	}
	
	//Heatmap Properties
	NgMap.getMap().then(function(map) {
		
		$scope.map = map;
		$scope.heatMap = $scope.map.heatmapLayers.foo;
		
		var gradient = [
                        'rgba(0, 255, 255, 0)',
                        'rgba(0, 255, 255, 1)',
                        'rgba(0, 191, 255, 1)',
                        'rgba(0, 127, 255, 1)',
                        'rgba(0, 63, 255, 1)',
                        'rgba(0, 0, 255, 1)',
                        'rgba(0, 0, 223, 1)',
                        'rgba(0, 0, 191, 1)',
                        'rgba(0, 0, 159, 1)',
                        'rgba(0, 0, 127, 1)',
                        'rgba(63, 0, 91, 1)',
                        'rgba(127, 0, 63, 1)',
                        'rgba(191, 0, 31, 1)',
                        'rgba(255, 0, 0, 1)'
                    ];

        $scope.heatMap.set('gradient', gradient);
		
	});
	
}]);