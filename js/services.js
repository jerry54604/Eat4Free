var app = angular.module('app.services', [])

app.factory('User', [function(){
  return {
    getUsername: function () {
      // TO-DO: Need to get from session instead of hardcode
      return 'TestUser';
    }
  };
}])

app.service('BlankService', [function(){

}]);

