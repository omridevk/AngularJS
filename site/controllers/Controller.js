(function() {
var appControllers = angular.module('appControllers',[]);

var controller = appControllers.controller('Controller',
    function Controller($scope) {

    });

appControllers.controller('menuController', 
    function($scope, $location) {
        $scope.menuItems = {
            topMenu: {
                pages:
                [
                    {
                        title:'Home',
                        index: 0,
                        href: 'home'
                    },
                    {
                        title: 'Tests',
                        index: 1,
                        href: ''
                    },
                    {
                        title: 'About',
                        index: 2,
                        href:'pages/about'
                    }
                ]
            },
            sideMenu: {
                pages: 
                [
                    {
                        title: 'JSON Tester'
                    },
                    {
                        title: 'Flavor Tester'
                    }
                ]
            }
        }

        $scope.$on('$viewContentLoaded', function() {
            $("#main-menu").smartmenus();
            $('#Tests-button').sidr({
                name: 'tests-menu',
                side: 'left' // By default
            });
        });

        $scope.predicate = 'index';   //order menu items  by index number
    });




appControllers.controller('aceEditorController',['$scope', 'JsonData', function(scope, jsonData) {
    scope.modes = ['json'];
    jsonData.list(function(jsonData) {
        scope.testius = JSON.stringify(jsonData, null, "   ");
        scope.aceModel = scope.testius;
    });

    scope.template = '<div ui-ace="aceOption" ng-model="aceModel" style ="height:400px;"></div>',
    scope.mode = scope.modes[0];
    scope.aceOption = {
        mode: scope.mode.toLowerCase(),
        theme: 'monokai',
        onLoad: function (_ace) {

        // HACK to have the ace instance in the scope...
            scope.modeChanged = function () {
                _ace.getSession().setMode("ace/mode/" + scope.mode.toLowerCase());
            };
        }
    };


}]);


appControllers.controller('playerController', ['$scope', 'embedService', '$routeParams', 
    function(scope, embedService, routeParams) {
        scope.pageTitle = routeParams.test;
        scope.testJsonClick = function(event) {
        embedService(this.aceModel);
        $('#kaltura_player').hide();
        $('#kaltura_player').show(1000);
    }
}]);


appControllers.config(['$routeProvider', 
    function($routeProvider) {
        $routeProvider
            .when('/tests/:test', {
                templateUrl: 'site/templates/test.html',
                controller: 'menuController'
            })
            .when('/pages/:page', {
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