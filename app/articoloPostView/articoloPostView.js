'use strict';

angular.module('myApp.articoloPostView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/articoloPostView', {
            templateUrl: 'articoloPostView/articoloPostView.html',
            controller: 'articoloPostViewCtrl',
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

    .controller('articoloPostViewCtrl', [ '$scope', '$firebaseArray', '$location', 'currentAuth', 'articoloListService', 'UsersChatService',
        function($scope, $firebaseArray, $location, currentAuth, articoloListService, UsersChatService) {

        var ref = firebase.database().ref().child('articles');
        var ctrl = this;
        $scope.articles = $firebaseArray(ref);
        $scope.IDLoggato = currentAuth.uid;

       // $scope.dati.userId = $firebaseAuth().$getAuth().uid;
      //  $scope.dati.user = Users.getUserInfo($firebaseAuth().$getAuth().uid);
        $scope.dati.user = UsersChatService.getUserInfo(currentAuth.uid);
        $scope.fileToUpload = null;
        $scope.imgPath= "";




            $scope.createPostArticolo = function(){

                if ($scope.fileToUpload != null) {
                 //get the name of the file
                 var fileName = $scope.fileToUpload.name;
                 //specify the path in which the file should be saved on firebase
                 var storageRef = firebase.storage().ref("articoloImg/" + fileName);
                 $scope.storage = $firebaseStorage(storageRef);
                 var uploadTask = $scope.storage.$put($scope.fileToUpload);
                 uploadTask.$complete(function (snapshot) {
                 $scope.imgPath = snapshot.downloadURL;
                 $scope.createPostArticoloAddiction();
                 });
                 uploadTask.$error(function (error) {
                 $scope.dati.error = error + " - the Pizza will be added without a descriptive image!";
                 //add the pizza in any case (without the image)
                 $scope.createPostArticoloAddiction();
                 });
                 }
                 else {
                 //do not add the image
                 $scope.createPostArticoloAddiction();

                 }

                //$scope.createPostArticoloAddiction();

            };

            ctrl.onChange = function onChange(fileList) {
                $scope.fileToUpload = fileList[0];
            };

            $scope.createPostArticoloAddiction = function(){

                var title = $scope.article.titleTxt;
                var subtitle = $scope.article.subtitleTxt;
                var post = $scope.article.postTxt;
                var categoria = $scope.article.categoria;
                //var image=$scope.article.imgPath;

                // var name =  $scope.dati.user.name;
                //  var surname = $scope.dati.user.surname;


                $scope.articles.$add({

                    IDutente: $scope.IDLoggato,
                    name:  $scope.dati.user.name,
                    surname: $scope.dati.user.surname,
                    //   name: Users.getUserInfo(),
                    timestamp: articoloListService.getTimestamp(),
                    title: title,
                    post: post,
                    subtitle : subtitle,
                    categoria: categoria,
                    image: $scope.imgPath



                }).then(function(ref){
                    console.log(ref);
                },function (error) {
                    console.log(error);
                });
                $location.path("/homeView");

            }







    }]);

