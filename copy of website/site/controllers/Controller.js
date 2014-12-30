
var controller = App.controller('Controller',
    function Controller($scope) {

    });

App.controller('menuController', 
    function($scope) {
        $scope.open = false;
        $scope.menuClick = function(event){
            var element = event.path[0];
            if (!$("a").hasClass("active") && $scope.open === false) {
                $("a").removeClass("active");
                $(element).addClass("active");
                
                $scope.open = true;
            } else {
                if ($(element).hasClass("active")) {
                    $(element).removeClass("active");
                } else {
                    $("a").removeClass("active");
                    $(element).addClass("active");
                    $scope.open = false;
                }
            }            
        };

        $scope.menuItems = [
            'Tests',
            'About',
            'another'
        ];
    



    });

App.config(['$routeProvider', 
    function($routeProvider) {
        $routeProvider.
            when('/hello', {
                templateUrl: 'site/templates/test.html',
                controller: 'Controller'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }]);