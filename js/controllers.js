angular.module('app.controllers', [])
  
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
    