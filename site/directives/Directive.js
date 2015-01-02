(function() {
	App.directive('myMenu',
	    function () {
	        return {
	        	restrict: "AEC",
	            templateUrl: 'site/templates/menu.html'
	        };

	    });


	App.directive('ngElementReady', [function() {
	        return { //directive to execute all menu scripts.
	            priority: -1000, // a low number so this directive loads after all other directives have loaded. 
	            restrict: "A", // attribute only

	        };
	    }]);



	App.directive('playerDirective', [function() {
		return {
			link: function($scope,$element,$attributes) {

			}
		}
	}])
})();





App.directive('activeLink', ['$location', function(location) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, controller) {
        var clazz = attrs.activeLink;
        var path = attrs.href;
        path = path.substring(1); //hack because path does not return including hashbang
        scope.location = location;
        scope.$watch('location.path()', function(newPath) {
          if (path === newPath) {
            element.addClass(clazz);
          } else {
            element.removeClass(clazz);
          }
        });
      }
    };
  }]);
