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

        factory.getSourcesData = function(partnerId, entryId, callback) {
            while (factory.fetchingComplete === false) {
                this.embedSource(partnerId, entryId);
                return factory.flavorData;
            }
            callback();
            return factory.flavorData;
        };

        factory.embedSource = function(partnerId, entryId, myCallBack) {

            kWidget.getSources({

                'partnerId': partnerId,
                'entryId': entryId,
                'callback': function (data) {
                    // data includes an array of sources that can easily be put into a video tag:
                    for (var i = 0; i < data.sources.length; i++) {
                       factory.flavorData.splice(i,1,data.sources[i]);
                        data.sources[i].id = 'player' + i;
                        var test = i + 1;
                        if (test >= data.sources.length) {
                            factory.fetchingComplete = true;
                        }
                    }
                    myCallBack();
                }
            });
        };
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