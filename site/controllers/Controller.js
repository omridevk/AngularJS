(function() {
var appControllers = angular.module('appControllers',[]);

var controller = appControllers.controller('Controller',
    function Controller($scope) {

    });

appControllers.controller('menuController', 
    function($scope) {
        $scope.testJsonClick = function(event) {
            var jsonConfig = $scope.editor.getValue();
            kWidget.embed({
              'targetId': 'kaltura_player',
              'wid': '_1763321',
              'uiconf_id' : '27591371',
              'flashvars': {
                 "jsonConfig": jsonConfig
              },
           "entry_id": "1_91do9jzq" // Entry with captions
           }); 
            $('#kaltura_player').hide();
            $('#kaltura_player').show(1000);
        }

        $scope.playerConfig = {
            'uiConfId': '27591371',
            'partnerId': '1763321',
            'serviceUrl': '//cdnapi.kaltura.com'
            
        };

        $scope.menuItems = {
            topMenu: [
            'Home',
            'Tests',
            'About'
            ],
            sideMenu: [
            'JSON Tester',
            ]
        }
    
    });




// Unused function to look set active class to open menus //
// $scope.open = false;
// $scope.menuClick = function(event){
//     var element = event.path[0];
//     if (!$("a").hasClass("active") && $scope.open === false) {
//         $("a").removeClass("active");
//         $(element).addClass("active");
//         $scope.open = true;
//     } else {
//         if ($(element).hasClass("active")) {
//             $(element).removeClass("active");
//         } else {
//             $("a").removeClass("active");
//             $(element).addClass("active");
//             $scope.open = false;
//         }
//     }            
// };



appControllers.controller('playerController', 
    function($scope) {

    });


appControllers.config(['$routeProvider', 
    function($routeProvider) {
        $routeProvider
            .when('/tests/:json-tester', {
                templateUrl: 'site/templates/test.html',
                controller: 'menuController'
            })
            .when('/about', {
                templateUrl: 'site/templates/about.html',
                controller: 'Controller'
            })
            .otherwise({
                templateUrl: 'site/templates/home.html',
                controller: 'menuController',
                redirectTo: '/home'
            });
    }]);


appControllers.filter('menuFilter', function() {
    return function(input) {
        return input.toLowerCase().replace(' ', '-')
    };
});


})();