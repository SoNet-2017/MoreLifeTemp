'use strict';

angular.module('myApp.articolo.articoloService', [])

    .factory('Articolo', function($firebaseArray) {
        var articoloService = {
            getData: function () {
                var ref = firebase.database().ref().child("articles");
                // download the data into a local object
                return $firebaseArray(ref);
            }
        };
        return articoloService;
    });
