
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
        factory.flavorData = [];
        factory.fetchingComplete=false;
        //factory.getSourcesData = function(partnerId, entryId) {
        //    var defer = $q.defer();
        //    //defer.promise.then(function() {
        //    //    alert("my promise");
        //    //})
        //    defer.resolve();
        //}
        factory.getSourcesData = function(partnerId, entryId, callback) {


            while (factory.fetchingComplete === false) {
                this.embedSource(partnerId, entryId);
                return factory.flavorData;

            }
            return factory.flavorData;

        };
        //factory.flavorData = [];
        factory.helloWorld = function() {
            //console.log("Hello world");

        };
        factory.embedSource = function(partnerId, entryId) {

            kWidget.getSources({

                'partnerId': partnerId,
                'entryId': entryId,
                'callback': function (data) {
                    // data includes an array of sources that can easily be put into a video tag:
                    for (var i = 0; i < data.sources.length; i++) {
                        //console.log(data.sources[i]);
                       factory.flavorData.splice(i,1,data.sources[i]);
                        //console.log(i);
                        //console.log(data.sources.length);
                        var test = i + 1;
                        //console.log(test);
                        if (test >= data.sources.length) {
                            console.log(i);
                            factory.fetchingComplete = true;
                        }

                    }
                }
            });
            //console.log(flavorData);
            //return factory.flavorData;
        };
        //console.log(factory);
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