appDirectives = angular.module('app.directives', [])

appDirectives.directive('blankDirective', [function(){

}]);

appDirectives.directive('qrcode', function($interpolate) {  
  return {
    restrict: 'E',
    link: function($scope, $element, $attrs) {
      
      var options = {
        text: '',
        width: Math.min(window.innerHeight, window.innerWidth) / 4 * 3,
        height: Math.min(window.innerHeight, window.innerWidth) / 4 * 3,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: 'H'
      };

      Object.keys(options).forEach(function(key) {
        options[key] = $interpolate($attrs[key] || '')($scope) || options[key];
      });

      options.correctLevel = QRCode.CorrectLevel[options.correctLevel];

      new QRCode($element[0], options);

    }
  };
});

appDirectives.directive('duplicated', function($q, $timeout, $http) {
  var EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      var usernames = ['Jim', 'John', 'Jill', 'Jackie'];

      ctrl.$asyncValidators.duplicated = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty model valid
          return $q.when();
        }

        var deferred = $q.defer();
        
        // Do not fire ajax call when email is not valid, just ignore this checking and mark as resolved
        if (EMAIL_REGEXP.test(modelValue)) {
          var link = 'http://localhost/eat4free/check-user-exist.php?email=' + modelValue;
          $http({
            method: 'GET',
            url: link
          }).then(function successCallback(response) {
              if (response.data === 'false')
                deferred.resolve();
              else
                deferred.reject();
            }, function errorCallback(response) {
              deferred.reject();
            });
        } else {
          deferred.resolve();
        }

        return deferred.promise;
      };
    }
  };
});

appDirectives.directive('email', function($q, $timeout, $http) {
  var EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      var usernames = ['Jim', 'John', 'Jill', 'Jackie'];

      ctrl.$asyncValidators.email = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty model valid
          return $q.when();
        }

        var deferred = $q.defer();
        
        if (EMAIL_REGEXP.test(modelValue)) {
          deferred.resolve();
        } else {
          deferred.reject();
        }

        return deferred.promise;
      };
    }
  };
});