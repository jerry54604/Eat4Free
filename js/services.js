var app = angular.module('app.services', [])

app.factory('User', function($q, $http){
  return {
    getId: function () {
      var deferred = $q.defer();
      var promise = deferred.promise;
      
      var link = 'http://localhost/eat4free/get-token-data.php';
      
      $http({
        method: 'GET',
        url: link,
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('Auth') }
      }).then(function successCallback(response) {
          deferred.resolve(response.data.id);
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
  };
})

app.service('BlankService', [function(){

}]);

app.service('LoginService', function($q, $http, $httpParamSerializerJQLike) {
  return {
    loginUser: function(username, pass) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      
      var link = 'http://localhost/eat4free/login.php';
      
      $http({
        method: 'POST',
        url: link,
        data: $httpParamSerializerJQLike({username : username, pass: pass}),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(function successCallback(response) {
          localStorage.setItem('Auth', response.data);
          
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

app.service('SignupService', function($q, $http, $httpParamSerializerJQLike) {
  return {
    signup: function(username, pass, email, firstname, lastname) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      
      var link = 'http://localhost/eat4free/signup.php';
      
      $http({
        method: 'POST',
        url: link,
        data: $httpParamSerializerJQLike({username : username, pass: pass, email: email, firstname: firstname, lastname: lastname}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function successCallback(response) {
          localStorage.setItem('Auth', response.data);
          
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