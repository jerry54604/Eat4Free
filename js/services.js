var app = angular.module('app.services', [])

app.factory('User', [function(){
  return {
    getUsername: function () {
      // TO-DO: Need to get from session instead of hardcode
      return window.localStorage.getItem("username"); //'TestUser';
    }
  };
}])

app.service('BlankService', [function(){

}]);

app.service('LoginService', function($q, $http, $httpParamSerializerJQLike) {
  return {
    loginUser: function(username, pass) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      
      $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      var link = 'http://localhost/eat4free/login.php';
      
      $http({
        method: 'POST',
        url: link,
        data: $httpParamSerializerJQLike({username : username, pass: pass}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function successCallback(response) {
          window.localStorage.setItem('username', username);
          window.localStorage.setItem('Auth', response.data);
          
          deferred.resolve('Welcome ' + username + '!');
        }, function errorCallback(response) {
          deferred.reject('Wrong credentials.');
        });
      
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