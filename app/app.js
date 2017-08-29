'use strict';

// Initialize the Firebase SDK
var config = {
    apiKey: "AIzaSyDdiQp4zfY2ir00WdRd2yzz-aOssXIkzDk",
    authDomain: "more-life-3dcac.firebaseapp.com",
    databaseURL: "https://more-life-3dcac.firebaseio.com",
    projectId: "more-life-3dcac",
    storageBucket: "more-life-3dcac.appspot.com",
    messagingSenderId: "157201507153"
};
firebase.initializeApp(config);

// Declare app level module which depends on views, and components
angular.module('myApp', [
    "firebase",
    'ngRoute',

    //views
    'myApp.loginView',
    'myApp.authentication',
    'myApp.homeView',
    'myApp.formRegistrazioneView',
    'myApp.articoloPostView',
    'myApp.trendPostView',
    'myApp.recensionePostView',
    'myApp.trendAttiviView',


    //componenti
    'myApp.users',
    'myApp.fileUpload',
    'myApp.trendAttivi',

    'myApp.articolo',
    'myApp.recensione',
    'myApp.trend'




])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/homeView'});
    }])
    .run(["$rootScope", "$location", function($rootScope, $location) {
        $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
            // We can catch the error thrown when the $requireSignIn promise is rejected
            // and redirect the user back to the home page
            if (error === "AUTH_REQUIRED") {
                $location.path("/loginView");
            }
        });
    }])

    .controller('MainCtrl',  ['$scope', '$rootScope', 'Auth', '$firebaseAuth', '$location', function($scope, $rootScope, Auth, $firebaseAuth, $location) {
        //this controller only declares a function to get information about the user status (logged in / out)
        //it is used to show menu buttons only when the user is logged

        //set the variable that is used in the main template to show the active button
        $rootScope.dati = {};
        $scope.auth=Auth;
        //creare una funzione per richiamare questo $firebaseAuth().$getAuth().CurrentUser)
        //if ($firebaseAuth().$getAuth()!=null)
        //{console.log("ciao"+$firebaseAuth().$getAuth().CurrentUser);}
        $scope.isLogged = function()
        {
            if ($firebaseAuth().$getAuth())
                return true;
            else
                return false;
        }

        $scope.logout = function () {

            //save the new status in the database (we do it before the actual logout because we can write in the database only if the user is logged in)
            //Users.registerLogout(currentAuth.uid);
            //sign out
            $firebaseAuth().$signOut();
            $firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
                if (firebaseUser) {
                    console.log("User is yet signed in as:", firebaseUser.uid);
                } else {
                    $location.path("/loginView");
                }
            });


        };


    }]);