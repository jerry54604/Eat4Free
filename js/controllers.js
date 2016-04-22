angular.module('app.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
 
    $scope.login = function() {
      LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
        $state.go('menu.home');
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        });
      });
    }
})

.controller('homeCtrl', function($scope, User) {
  $scope.username = User.getUsername();
})
   
.controller('voucherCtrl', function($scope) {

})
   
.controller('searchCtrl', function($scope) {

})
   
.controller('accountCtrl', function($scope) {

})
   
.controller('sampleCtrl', function($scope) {

})
    