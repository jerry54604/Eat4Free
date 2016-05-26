angular.module('app.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};
  if (localStorage.getItem('Auth') !== null) {
    $state.go('menu.home');
  }

  $scope.login = function() {
    LoginService.loginUser($scope.data.username, $scope.data.password)
    .success(function(data) {
      $state.go('menu.home');
    }).error(function(data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  }
})

.controller('SignupCtrl', function($scope, SignupService, $ionicPopup, $state) {
  $scope.data = {};
  if (localStorage.getItem('Auth') !== null) {
    $state.go('menu.home');
  }

  $scope.signup = function() {
    // username = email
    SignupService.signup($scope.data.email, $scope.data.password, $scope.data.email, $scope.data.firstname, $scope.data.lastname)
    .success(function(data) {
      $state.go('menu.home');
    }).error(function(data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Signup failed!',
        template: 'Please check your inputs!'
      });
    });
  }
})

.controller('homeCtrl', function($scope, User) {
  $scope.flag=false;
  User.getId().success(function(data) {
    $scope.flag=true;
      $scope.id = data;
    }).error(function(data) {
      
    });
})
   
.controller('voucherCtrl', function ($scope) {
  // Get vouchers from server
  $scope.vouchers = [
    { title: "Voucher1", description: "simple voucher", expired_date: "31 May 2016" },
    { title: "Voucher2", description: "simple voucher2", expired_date: "3 Jun 2016" }
  ];
})
   
.controller('searchCtrl', function($scope) {

})
   
.controller('accountCtrl', function($scope) {

})
   
.controller('sampleCtrl', function($scope) {

})
