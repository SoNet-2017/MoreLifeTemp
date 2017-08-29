'use strict';

angular.module('myApp.trendPostView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/trendPostView', {
            templateUrl: 'trendPostView/trendPostView.html',
            controller: 'trendPostViewCtrl',
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

    .controller('trendPostViewCtrl', [ '$scope', '$firebaseArray', '$location', 'currentAuth', 'trendListService', 'UsersChatService',
        function($scope, $firebaseArray, $location, currentAuth, trendListService, UsersChatService) {

        var ref = firebase.database().ref().child('trends');
        $scope.articles = $firebaseArray(ref);
        $scope.IDLoggato = currentAuth.uid;

        $scope.dati.user = UsersChatService.getUserInfo(currentAuth.uid);

        $scope.createPostTrend = function(){

            var title = $scope.article.titleTxt2;
            var post = $scope.article.postTxt2;
            var trend= "TREND";

            $scope.articles.$add({

                IDutente: $scope.IDLoggato,
                timestamp: trendListService.getTimestamp(),
                name:  $scope.dati.user.name,
                surname: $scope.dati.user.surname,
                title: title,
                post: post,
                trend : trend,



            }).then(function(ref){
                console.log(ref);
            },function (error) {
                console.log(error);
            });
            $location.path("/homeView");
        }


    }]);

