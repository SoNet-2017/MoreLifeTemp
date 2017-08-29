'use strict';

angular.module('myApp.recensionePostView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/recensionePostView', {
            templateUrl: 'recensionePostView/recensionePostView.html',
            controller: 'recensionePostViewCtrl',
            resolve: {
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function(Auth) {
                    // $requireSignIn returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $routeChangeError (see above)
                    return Auth.$requireSignIn();
                }]
            }
        });
    }])

    .controller('recensionePostViewCtrl', [ '$scope', '$firebaseArray', '$location', 'currentAuth', 'recensioneListService', 'UsersChatService',
        function($scope, $firebaseArray, $location, currentAuth, recensioneListService, UsersChatService) {

        var ref = firebase.database().ref().child('reviews');
        $scope.articles = $firebaseArray(ref);
        $scope.IDLoggato = currentAuth.uid;

        $scope.dati.user = UsersChatService.getUserInfo(currentAuth.uid);


        $scope.createPostRecensione = function(){

            var title = $scope.article.titleTxt;
            var post = $scope.article.postTxt;

            $scope.articles.$add({

                IDutente: $scope.IDLoggato,
                timestamp: recensioneListService.getTimestamp(),
                name:  $scope.dati.user.name,
                surname: $scope.dati.user.surname,
                title: title,
                post: post,



            }).then(function(ref){
                console.log(ref);
            },function (error) {
                console.log(error);
            });
            $location.path("/homeView");
        }


    }]);

