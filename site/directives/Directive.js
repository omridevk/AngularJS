(function() {
	App.directive('myMenu',
	    function () {
	        return {
	        	restrict: "AEC",
	            templateUrl: 'site/templates/menu.html'
	        };

	    });





    App.directive('myRepeater', function() {
      return {
        restrict: "A",
        link: function(scope, element, attrs) {
          if (attrs.id === "Tests-button") { //activate sidebar
            $(element).sidr({
              name: 'tests-menu',
              side: 'left' // By default
            });
          }
          if(scope.$last) { //activate top menu after last menu item is loaded
            var el = attrs.myRepeater;
            if (el === "main-menu") {
              el = "#" + el;
              window.$(el).smartmenus();
            }

          }
        }

      }
    });


    App.directive('myTestPages', function() {
      return {
        restrict: "A",
        link: function(scope, element, attrs) {

        }
      }
    })


	App.directive('myEmbed', ['$timeout', function($timeout) {
		return {
            restrict: 'AEC',
            transclude:true,
			link: function(scope,element,attrs) {
              scope.sources = angular.fromJson(attrs.data);
              if (scope.sources.type === "video/h264") {
                $timeout(function() {
                  kWidget.embed({
                    'targetId': attrs.id,
                    'wid': '_1763321',
                    'uiconf_id': '27053901',
                    'flashvars': {
                      'streamerType': 'http'
                    },
                    "sourceType":'url',
                    "entry_id": scope.sources.src
                  });
                });
              }

            }
		}
	}])

    App.directive('myFooter', [function() {
      return {
        restrict: 'AEC',
        templateUrl: 'site/templates/footer.html'
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


App.directive('myDraggable', ['$document', function($document) {
  return function(scope, element, attr) {
    var startX = 0, startY = 0, x = 0, y = 0;

    element.css({
     position: 'relative',
     cursor: 'pointer'
    });

    element.on('mousedown', function(event) {
      // Prevent default dragging of selected content
      event.preventDefault();
      startX = event.pageX - x;
      startY = event.pageY - y;
      $document.on('mousemove', mousemove);
      $document.on('mouseup', mouseup);
    });

    function mousemove(event) {
      y = event.pageY - startY;
      x = event.pageX - startX;
      element.css({
        top: y + 'px',
        left:  x + 'px'
      });
    }

    function mouseup() {
      $document.off('mousemove', mousemove);
      $document.off('mouseup', mouseup);
    }
  };
}]);