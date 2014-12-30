(function() {
	App.directive('myMenu',
	    function () {
	        return {
	        	restrict: "AEC",
	            templateUrl: 'site/templates/menu.html',
	            link: function($scope, $element, $attributes) {
    				window.setTimeout(function(){
						$('#main-menu').smartmenus();
						$('#Tests-button').sidr({
							name: 'tests-menu',
							side: 'left' // By default
						});
						$('#About-button').sidr({
							name: 'about-menu',
							side: 'left'
						});
					}, 0001);	
    				
	                // do what you want here.
	            }
	        };

	    var test =  function () {

				return this;    	
			};


	    });


	App.directive('ngElementReady', [function() {
	        return { //directive to execute all menu scripts.
	            priority: -1000, // a low number so this directive loads after all other directives have loaded. 
	            restrict: "A", // attribute only

	        };
	    }]);

	App.directive('ngAceEditor', [function() {
        return { //directive to execute all menu scripts.
        	link: function($scope, $element, $attributes) {
    				window.setTimeout(function(){
						kWidget.embed({
							"targetId": "kaltura_player",
							"wid": "_1763321",
							"uiconf_id": 27591371,
							"flashvars": {
								"streamerType": "auto"
							},
							"cache_st": 1419884418,
							"entry_id": "0_a293ujo3"
						});
    					$scope.editor = ace.edit("editor");
						$scope.editor.setTheme("ace/theme/monokai");
						$scope.editor.getSession().setMode("ace/mode/json");
					}, 0001);	
        	},
            priority: -1000, // a low number so this directive loads after all other directives have loaded. 
            restrict: "AEC", // attribute only

        };
    }]);

	App.directive('playerDirective', [function() {
		return {
			link: function($scope,$element,$attributes) {

			}
		}
	}])


})();


