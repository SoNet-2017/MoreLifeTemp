'use strict';

angular.module('myApp.trendAttivi.trendAttivoService', [])

    .factory('TrendAttivo', function($firebaseArray) {
        var trendAttivoService = {
            getDataTrendAttivo: function () {
                var ref = firebase.database().ref().child("newtrend");
                // download the data into a local object
                return $firebaseArray(ref);
            }
        };
        return trendAttivoService;
    });
