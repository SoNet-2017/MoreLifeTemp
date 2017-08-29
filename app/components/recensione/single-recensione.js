'use strict';

angular.module('myApp.recensione.recensioneService', [])

    .factory('Recensione', function($firebaseArray) {
        var recensioneService = {
            getDataRecensione: function () {
                var ref = firebase.database().ref().child("reviews");
                // download the data into a local object
                return $firebaseArray(ref);
            }
        };
        return recensioneService;
    });
