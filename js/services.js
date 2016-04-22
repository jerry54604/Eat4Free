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

app.service('LoginService', function($q) {
  return {
    loginUser: function(name, pw) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      
      // Change this line to get from service
      if (name == 'user' && pw == 'secret') {
        deferred.resolve('Welcome ' + name + '!');
      } else {
        deferred.reject('Wrong credentials.');
      }
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})