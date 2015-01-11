(function() {
var appControllers = angular.module('appControllers',[]);

var controller = appControllers.controller('Controller',
    function Controller($scope) {

    });

appControllers.controller('menuController', 
    function($scope, $location, $routeParams, $rootScope) {

        $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
            $location.path('pages/home'); //redirect home if template is not found
        });
        $scope.menuItems = {
            topMenu: {
                pages:
                [
                    {
                        title:'Home',
                        index: 0,
                        href: 'pages/home'
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

        $scope.predicate = 'index';   //order menu items  by index number
    });


appControllers.controller('flavorTestController', ['$scope', 'getSourcesService',
    function(scope, getSourcesService){

        scope.flavorsSrcUrl = {};
        scope.testFlavorClick = function(event) {
            scope.partnerId = this.partnerId;
            scope.entryId = this.entryId;
            getSourcesService.embedSource(scope.partnerId, scope.entryId, function() {
                scope.flavorsSrcUrl = getSourcesService.getSourcesData(this.partnerId, this.entryId, function() {
                });
                scope.$apply(function() {
                })
            });

        }

}])

appControllers.controller('aceEditorController',['$scope', 'JsonData', function(scope, jsonData) {
    scope.modes = ['json'];
    jsonData.list(function(jsonData) {
        scope.jsonTemp = JSON.stringify(jsonData, null, "   ");
        scope.aceModel = scope.jsonTemp;
    });
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
    }


}]);


appControllers.controller('playerController', ['$scope', 'embedService', '$routeParams', 'getSourcesService', 
    function(scope, embedService, routeParams, getSourcesService) {
        scope.pageTitle = routeParams.test;
        
        scope.testJsonClick = function(event) {
            var partnerId = 1763321;
            var entryId = '1_91do9jzq';
            //getSourcesService(partnerId, entryId);
            embedService(this.aceModel);
            $('#kaltura_player').hide().show(1000);
    }
}]);

appControllers.controller('footerController', ['$scope', function(scope) {
    scope.footer = 'site/templates/footer.html'
}]);

appControllers.config(['$routeProvider', 
    function($routeProvider) {
        $routeProvider
            .when('/tests/:test', {
                templateUrl: function(params) {
                    return 'site/templates/' + params.test + '.html';
                },
                controller: 'menuController'
            })
            .when('/pages/:page', {
                templateUrl: function(params){
                    return 'site/templates/' + params.page + '.html';
                },
                controller: 'menuController'
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