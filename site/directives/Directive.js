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


	App.directive('myEmbed', [function() {
		return {
            restrict: 'AEC',
            transclude: true,
            scope: {
              test: '@'
            },
			link: function(scope,element,attrs) {
              console.log(element[0].id);
              //kWidget.embed({
              //  'targetId': element[0].id,
              //  'wid': '_'+attrs.partnerid,
              //  'uiconf_id' : '27591371',
              //  'flashvars': {
              //  },
              //  "entry_id": attrs.entryid
              //});
            },
            templateUrl: 'site/templates/player.html'
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
     // border: '1px solid red',
     // backgroundColor: 'lightgrey',
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