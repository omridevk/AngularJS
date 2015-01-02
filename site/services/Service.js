
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
