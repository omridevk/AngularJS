
App.factory('embedService', ['$window', function(win) {
   return function(jsonConfig) {
        kWidget.embed({
          'targetId': 'kaltura_player',
          'wid': '_1763321',
          'uiconf_id' : '27591371',
          'flashvars': {
             "jsonConfig": jsonConfig
          },
       "entry_id": "1_91do9jzq"
       }); 
   };
 }]);


App.factory('getSourcesService', ['$window', function(win) {
        var factory = {};
        factory.helloWorld = function() {
            console.log("Hello world");

        };
        factory.embedSource = function(partnerId, entryId) {
            var flavorData = [];
            kWidget.getSources({

                'partnerId': partnerId,
                'entryId': entryId,
                'callback': function (data) {
                    // data includes an array of sources that can easily be put into a video tag:
                    for (var i = 0; i < data.sources.length; i++) {
                        //console.log(data.sources[i]);
                       flavorData.push(data.sources[i]);

                    }

                    return flavorData;
                }
            });
            console.log(flavorData);
            return flavorData;
        };
        console.log(factory);
        return factory;
 }]);




App.factory('JsonData', function($http){
  return {
    list: function (callback){
      $http({
        method: 'GET',
        url: 'site/models/data.json',
        cache: true
      }).success(callback);
    }
  };
});