angular.module('myApp.homeView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/homeView', {
            templateUrl: 'homeView/homeView.html',
            controller: 'homeViewCtrl',
            resolve: {
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function(Auth) {
                    // $requireSignIn returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $routeChangeError (see above)
                    return Auth.$requireSignIn();
                }]

            }
        })
    }])

    .controller('homeViewCtrl', ['$scope','$rootScope', 'currentAuth', 'Articolo', 'Recensione', 'Trend', 'UsersChatService','$firebaseArray', '$firebaseObject',
        function($scope, $rootScope, currentAuth, Articolo, Recensione, Trend , UsersChatService, $firebaseArray, $firebaseObject) {
            $scope.dati = {};

        //    $scope.dati.vm = this;
          //  $scope.dati.vm.positions = [];
          //  $rootScope.dati.currentView = "home";
            //get the list of available pizzas
            $scope.dati.articles = Articolo.getData();

            $scope.dati.trends = Trend.getDataTrend();

            $scope.dati.reviews = Recensione.getDataRecensione();


            $scope.dati.user = UsersChatService.getUserInfo(currentAuth.uid);




            $scope.currentPosition = 1;
            $scope.changeView = function (id)
            {
                $scope.currentPosition = id;
            };


          //  var ref = firebase.database().ref().child('articles');
        //    $scope.dati.articles=$firebaseArray(ref);


            $scope.showPostArticolo = function (id) {

                var ref = firebase.database().ref().child('articles/' + id);
                $scope.showPostData = $firebaseObject(ref);

            };

            $scope.showPostRecensione = function (id) {

                var ref = firebase.database().ref().child('reviews/' + id);
                $scope.showPostData = $firebaseObject(ref);

            };

            $scope.showPostTrend = function (id) {

                var ref = firebase.database().ref().child('trends/' + id);
                $scope.showPostData = $firebaseObject(ref);

            }
        }]);