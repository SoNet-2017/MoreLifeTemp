'use strict';

angular.module('myApp.loginView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/loginView', {
    templateUrl: 'loginView/loginView.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', '$rootScope', 'Auth', '$location', '$log','Users', function($scope, $rootScope, Auth, $location, $log, Users) {
    $scope.user={};
    $scope.auth = Auth; //acquires authentication from app.js (if it was done)
  //  var database =firebase.database();


    $scope.signIn = function() {

        $scope.firebaseUser = null;
        $scope.error = null;

      //  $rootScope.dati.currentView = "login";
        $scope.auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
            var userId = firebaseUser.uid;
         Users.registerLogin(userId, $scope.user.email);

                    // login successful: redirect to the pizza list
            $location.path("/homeView");
        }).catch(function(error) {
            $scope.error = error;
            $log.error(error.message);
        });
    };
}]);