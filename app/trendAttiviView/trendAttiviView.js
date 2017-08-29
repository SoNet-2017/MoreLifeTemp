'use strict';

angular.module('myApp.trendAttiviView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/trendAttiviView', {
            templateUrl: 'trendAttiviView/trendAttiviView.html',
            controller: 'trendAttiviViewCtrl',
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

    .controller('trendAttiviViewCtrl', [ '$scope', '$firebaseArray', '$location', 'currentAuth', 'TrendAttivo', 'trendAttivoListService', 'SingleTrendAttivo','UsersChatService',
        function($scope, $firebaseArray, $location, currentAuth, TrendAttivo, trendAttivoListService, SingleTrendAttivo, UsersChatService) {

            var ref = firebase.database().ref().child('newtrend');
            $scope.newtrends = $firebaseArray(ref);
            $scope.IDLoggato = currentAuth.uid;

            $scope.dati.user = UsersChatService.getUserInfo(currentAuth.uid);
            $scope.dati.trendAttivos = TrendAttivo.getDataTrendAttivo();


            $scope.createNewTrend = function(){

                var title = $scope.newtrend.titleTxt;
                var categoria = $scope.newtrend.categoria;

                $scope.newtrends.$add({

                    IDutente: $scope.IDLoggato,
                //    timestamp: recensioneListService.getTimestamp(),
                    name:  $scope.dati.user.name,
                    surname: $scope.dati.user.surname,
                    title: title,
                    categoria: categoria,



                }).then(function(ref){
                    console.log(ref);
                },function (error) {
                    console.log(error);
                });
                $location.path("/homeView");

            },


            $scope.showPostArticolo = function (id) {

                var ref = firebase.database().ref().child('articles/' + id);
                $scope.showPostData = $firebaseObject(ref);

            };

        }]);

